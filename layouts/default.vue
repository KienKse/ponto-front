<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="#36abff">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; </span>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-timer',
          title: 'Ponto',
          to: '/'
        },
        {
          icon: 'mdi-tie',
          title: 'Jornada',
          to: '/jornada'
        },
        {
          icon: 'mdi-chart-line',
          title: 'Mensal',
          to: '/mensal'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ponto'
    }
  }
}
</script>
