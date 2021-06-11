<template lang="pug">
  .works-container
    .page-content
      .container 
        .header
          .title Блок "Работы"

        ul.works__list
          .works__item.works__new-item
            btn(type="square" title="Добавить работу" @click="addNew")
          
            
</template>

<script>
import btn from "../../components/button";

export default {
  components: {
    btn
  },
  data() {
    return {
      showWorkForm: false
    }
  },
  methods: {
    addNew() {
      showWorkForm = true
    },
    cancelClick() {
      this.showWorkForm = false
    }
  }
}
</script>

<style lang="postcss" scoped src="./works.pcss"></style>