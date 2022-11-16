// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default {
  validateToken() {
    if (sessionStorage.getItem('tknReiFormunica') !== null) {
      const token = sessionStorage.getItem('tknReiFormunica')
      const decode = jwt_decode(token)
      const date = new Date(decode.exp)
      const usuario = sessionStorage.getItem('userRei')

      if (date > Date.now()) {
        sessionStorage.removeItem('tknReiFormunica')
        sessionStorage.removeItem('userRei')
        this.$router.push('/')

        return false
      }

      // eslint-disable-next-line consistent-return
      axios.get(`/api/login/${usuario}`).then(response => {
        if (response.data.mensaje === 'Invalido') {
          sessionStorage.removeItem('tknReiFormunica')
          sessionStorage.removeItem('userRei')
          this.$router.push('/')

          return false
        }
      }).catch(error => {
        console.log(error)
      })

      return true
    }

    return false
  },
}