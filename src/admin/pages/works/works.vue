<template lang="pug">
  .works-container
    .page-content
      .container 
        .header
          .title Блок "Работы"
        work-form(
          v-if="showWorkForm"
          @save="saveClick"
          @cancel="cancelClick"
        )
        ul.works__list
          .works__item.works__new-item
            btn(type="square" title="Добавить работу" @click="addNew")
          li.works__item.works__loaded-item(v-for="work in works" :key="work.id")
            work-card(:work="work")
            
</template>

<script>
import btn from "../../components/button";
import workCard from "../../components/workCard";
import workForm from "../../components/workForm";

export default {
  components: {
    btn,
    workCard,
    workForm
  },
  data() {
    return {
      showWorkForm: false
    }
  },
  methods: {
    addNew(work) {
      this.showWorkForm = true
    },
    saveClick() {
      this.showWorkForm = false
    },
    cancelClick() {
      this.showWorkForm = false
    }
  }
}
</script>

<style lang="postcss" scoped src="./works.pcss"></style>