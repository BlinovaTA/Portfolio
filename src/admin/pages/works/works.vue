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
import { mapActions, mapState } from "vuex";

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
  computed: {
    ...mapState("works", {
      works: state => state.data,
    })
  },
  methods: {
    ...mapActions({
      fetchWorksAction :"works/fetch",
      addNewWork: "works/add",
      showTooltip: "tooltips/show"
    }),
    addNew() {
      this.showWorkForm = true;
    },
    async saveClick(work) {
      this.showWorkForm = false;

      try {
        await this.addNewWork(work);

        this.showTooltip({
          text: "Новая работа добавлена",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    cancelClick() {
      this.showWorkForm = false;
    },
    async fetchWorks() {
      try {
        await this.fetchWorksAction();

        this.showTooltip({
          text: "Работы загружены",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    }
  },
  created() {
    this.fetchWorks();
  }
}
</script>

<style lang="postcss" scoped src="./works.pcss"></style>