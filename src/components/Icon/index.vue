<template>
    <svg
     :class="`doc ${className}`"
     aria-hidden="true"
     :onclick="onClick">
        <use :xlink:href="`#${type}`"></use>
    </svg>
</template>

<script>
export default {
  name: 'icon',
  props: ['type', 'className', 'onClick'],
  data () {
    return {}
  },
  created () {},
  methods: {},
  mounted () {},
  computed: {}
}

</script>
<style scoped>
  .dic{
    display: inline-block;
  }
</style>
