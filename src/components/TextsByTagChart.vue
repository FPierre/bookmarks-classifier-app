<script>
import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
  props: ['textsByTag'],
  mounted () {
    const datasets = []

    for (const tag in this.textsByTag) {
      if (this.hasOwnProperty(tag)) {
        console.log(this.textsByTag[tag])

        datasets.push({
          label: tag,
          backgroundColor: '#cc0000',
          data: this.textsByTag[tag]
        })
      }
    }

    this.renderChart({
      labels: this.textsByTag,
      datasets: datasets
    })
  }
})
</script>
