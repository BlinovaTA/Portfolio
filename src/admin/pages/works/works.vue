<template lang="pug">
  .works-container
    .page-content
      .container 
        .header
          .title Блок "Работы"

        ul.works__list
          .works__item.works__new-item
            btn(type="square" title="Добавить работу" @click="addNew")
          li.works__item.works__loaded-item(v-for="work in works" :key="work.id")
            work-card(:work="work")
            
</template>

<script>
import btn from "../../components/button";
import workCard from "../../components/workCard";

export default {
  components: {
    btn,
    workCard
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