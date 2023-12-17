<template>
  <div class="form-container">
    <div class="row">
      <div class="col">
        <alert-message
          :type="alerta.tipo"
          :message="alerta.mensagem"
          @clear="alerta.mensagem = ''"
          v-if="!!alerta.mensagem"
        />

        <div class="etapa">
          Etapa <i>{{ etapa }}</i> de 4
        </div>
        <div v-if="etapa === 1">
          <h2>Seja bem vindo(a)</h2>
          <div class="form">
            <form-input
              v-model="form.email"
              label="Endereço de e-mail"
              type="email"
              name="email"
              required
              :error="erros.email"
            />
            <form-radio-group
              v-model="form.tipo"
              :items="tipos"
              name="tipo"
              :error="erros.tipo"
            />
            <button type="button" class="btn" @click="validarFormulario(1)">
              Continuar
            </button>
          </div>
        </div>
        <div v-if="etapa === 2">
          <h2 v-if="form.tipo === 'pf'">Pessoa Física</h2>
          <h2 v-else>Pessoa Jurídica</h2>
          <div class="form">
            <form-input
              v-model="form.nome_razao"
              :label="form.tipo === 'pf' ? 'Nome' : 'Razão Social'"
              type="text"
              name="nome_razao"
              :error="erros.nome_razao"
            />
            <form-input
              v-model="form.documento"
              :label="form.tipo === 'pf' ? 'CPF' : 'CNPJ'"
              :maxlength="18"
              type="text"
              name="documento"
              :error="erros.documento"
            />
            <form-input
              v-model="form.dn_da"
              :label="
                form.tipo === 'pf' ? 'Data de Nascimento' : 'Data de Abertura'
              "
              type="date"
              name="dn_da"
              :error="erros.dn_da"
            />
            <form-input
              v-model="form.telefone"
              label="Telefone"
              type="text"
              name="telefone"
              :error="erros.telefone"
              :maxlength="15"
            />
          </div>
          <div class="row">
            <div class="col">
              <button class="btn reverse" @click="etapa--">Voltar</button>
            </div>
            <div class="col">
              <button class="btn" @click="validarFormulario(2)">
                Continuar
              </button>
            </div>
          </div>
        </div>
        <div v-if="etapa === 3">
          <h2>Senha de Acesso</h2>
          <div class="form">
            <form-input
              v-model="form.senha"
              label="Sua senha"
              type="password"
              name="senha"
              :error="erros.senha"
            />
          </div>
          <div class="row">
            <div class="col">
              <button class="btn reverse" @click="etapa--">Voltar</button>
            </div>
            <div class="col">
              <button class="btn" @click="validarFormulario(3)">
                Continuar
              </button>
            </div>
          </div>
        </div>
        <div v-if="etapa === 4">
          <h2>Revise suas informações</h2>
          <div class="form">
            <form-input
              v-model="form.email"
              label="Endereço de e-mail"
              type="text"
              name="nome_razao"
            />

            <!--
              Eu colocaria o campo de Tipo de Pessoa aqui, disabled para simples confirmação conferência.
              Levantaria esta questão, pelo menos.
            -->

            <form-input
              v-model="form.nome_razao"
              :label="form.tipo === 'pf' ? 'Nome' : 'Razão Social'"
              type="text"
              name="nome_razao"
            />
            <form-input
              v-model="form.documento"
              :label="form.tipo === 'pf' ? 'CPF' : 'CNPJ'"
              :maxlength="18"
              type="text"
              name="documento"
            />
            <form-input
              v-model="form.dn_da"
              :label="
                form.tipo === 'pf' ? 'Data de Nascimento' : 'Data de Abertura'
              "
              type="date"
              name="dn_da"
            />
            <form-input
              v-model="form.telefone"
              label="Telefone"
              type="text"
              name="telefone"
              :maxlength="15"
            />
            <form-input
              v-model="form.senha"
              label="Senha"
              type="password"
              name="senha"
            />
          </div>
          <div class="row">
            <div class="col">
              <button class="btn reverse" @click="etapa--">Voltar</button>
            </div>
            <div class="col">
              <button class="btn" @click="cadastrar()">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from "./AlertMessage";
import FormInput from "./form/Input";
import FormRadioGroup from "./form/RadioGroup";
import UsuarioService from "../services/UsuarioService";
export default {
  name: "RegistrationForm",
  components: {
    FormInput,
    FormRadioGroup,
    AlertMessage,
  },
  data() {
    return {
      alerta: {
        tipo: "error",
        mensagem: "",
      },
      etapa: 1,
      form: {
        email: "brunoangos@gmail.com",
        tipo: "pf",
        nome_razao: "",
        documento: "",
        dn_da: "",
        telefone: "",
        senha: "",
      },
      erros: {
        email: null,
        tipo: null,
        nome_razao: null,
        documento: null,
        dn_da: null,
        telefone: null,
        senha: null,
      },
      tipos: [
        {
          label: "Pessoa física",
          value: "pf",
        },
        {
          label: "Pessoa jurídica",
          value: "pj",
        },
      ],
    };
  },
  watch: {
    "form.documento": function (n) {
      this.form.documento = this.maskDocumento(n);
    },
    "form.telefone": function (n) {
      this.form.telefone = this.maskTelefone(n);
    },
  },
  methods: {
    async cadastrar() {
      const dados = this.form;
      try {
        const novoUsuario = await UsuarioService.registro(dados);
        if (novoUsuario?.error) {
          this.alerta.tipo = "error";
          this.alerta.mensagem =
            "Houve um problema ao cadastrar este usuário: " + novoUsuario.error;
          return;
        }

        this.alerta.tipo = "success";
        this.alerta.mensagem = "Usuário cadastrado com sucesso!";

        this.form = {
          email: "",
          tipo: "",
          nome_razao: "",
          documento: "",
          dn_da: "",
          telefone: "",
          senha: "",
        };

        this.etapa = 1;
      } catch (error) {
        console.error(error);
        this.alerta.tipo = "error";
        this.alerta.mensagem = "Houve um problema ao cadastrar este usuário.";
      }
    },
    validarFormulario(etapa) {
      let erro = false;
      this.alerta.mensagem = "";

      switch (etapa) {
        case 1:
          this.erros.email = "";
          this.erros.tipo = "";

          ["email", "tipo"].forEach((campo) => {
            if (!this.form[campo].trim()) {
              this.erros[campo] = "Este campo é obrigatório";
              erro = true;
            }
          });

          if (!this.validateEmail(this.form.email)) {
            this.erros.email = "O campo e-mail precisa ser um e-mail válido.";
            return;
          }

          if (!erro) this.etapa++;
          break;
        case 2:
          this.erros.nome_razao = "";
          this.erros.documento = "";
          this.erros.dn_da = "";
          this.erros.telefone = "";

          ["nome_razao", "documento", "dn_da", "telefone"].forEach((campo) => {
            if (!this.form[campo].trim()) {
              this.erros[campo] = "Este campo é obrigatório";
              erro = true;
            }
          });

          if (!erro) this.etapa++;
          break;
        case 3:
          this.erros.senha = "";

          if (!this.form.senha.trim()) {
            this.erros.senha = "Este campo é obrigatório";
            return;
          }

          if (!erro) this.etapa++;
          break;
        default:
          console.info(`Etapa ${etapa} não reconhecida...`);
      }
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    maskDocumento(v) {
      v = v.replace(/\D/g, "");

      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
      }

      return v;
    },
    maskTelefone(v) {
      var r = v.replace(/\D/g, "");
      r = r.replace(/^0/, "");
      if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      } else {
        r = r.replace(/^(\d*)/, "($1");
      }
      return r;
    },
  },
};
</script>

<style lang="scss">
.etapa {
  font-size: 13px;
  margin-bottom: 5px;

  i {
    color: orange;
  }
}

.form-container {
  display: flex;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 2px 2px 2px #ddd;
  max-width: 220px;
}
</style>
