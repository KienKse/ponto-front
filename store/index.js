const apontamentos = [
  { id: 1, data: 11, time: 12, obs: '33' },
  { id: 2, data: 21, time: 22, obs: '23' },
  { id: 3, data: 31, time: 32, obs: '33' }
]

export default {
  getApontamento() {
    return apontamentos
  },
  addApontamento(data, time, obs) {
    apontamentos.push({ data, time, obs })
  }
}
