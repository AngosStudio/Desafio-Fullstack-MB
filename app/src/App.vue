<template>
  <div id="app">
    <div id="menuTopo">
      <img src="logo-mb.svg" alt="Mercado BitCoin" />
      <router-link to="/" :class="$route.path === '/' ? 'active' : ''">
        Home
      </router-link>
      <router-link
        to="/registration"
        :class="$route.path === '/registration' ? 'active' : ''"
      >
        Registro
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background: #ececec;
}

#app {
  font-family: Calibri;

  #menuTopo {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 75px;
    box-shadow: 2px 2px 2px #ccc;

    img {
      max-height: 80%;
    }

    a {
      padding: 0 15px;
      text-decoration: none;
      color: black;

      &.active {
        font-weight: bold;
        color: orange;
      }
    }
  }

  .container {
    display: flex;
    justify-content: center;
    margin: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 2px 2px 2px #ddd;
  }

  .row {
    width: 100%;
    display: flex;

    .col {
      flex-grow: 1;
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .btn {
    background: orange;
    color: white;
    display: block;
    width: 100%;
    height: auto;
    padding: 8px;
    font-size: 11px;
    text-align: center;
    border: none;
    border-radius: 5px;
    border: 1px solid orange;

    &.reverse {
      color: orange;
      background: white;
    }
  }

  h1,
  h2 {
    margin-top: 0;
  }
  h2 {
    margin-bottom: 16px;
  }
}
</style>
