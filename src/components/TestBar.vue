<script>
import { Bubble } from 'vue-chartjs'

export default Bubble.extend({
  mounted () {
    this.renderChart({
      datasets: [
        {
          label: 'a',
          data: [
            { x: 20, y: 30, r: 45 },
            { x: 20, y: 10, r: 50 }
          ],
          backgroundColor: '#ff6384',
          hoverBackgroundColor: '#ff6384'
        }
      ]
    })
  }
})
</script>
