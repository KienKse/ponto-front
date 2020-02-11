<template>
  <v-flex>
    <v-row v-for="item in apontamentos" v-bind:key="item.id" no-gutters>
      <v-col cols="4">
        <v-card class="pa-2" outlined tile>
          {{ item.data }}
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-2" outlined tile>
          {{ item.time }}
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-2" outlined tile>
          {{ item.obs }}
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
import index from '@/store/index'

export default {
  data() {
    return {
      apontamentos: []
    }
  },
  created() {
    this.apontamentos = index.getApontamento()
  }
}
</script>
