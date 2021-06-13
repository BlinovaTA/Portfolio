<template lang="pug">
  .works-container
    .page-content
      .container 
        .header
          .title Блок "Работы"
        work-form(
          v-if="showWorkForm"
          :title="titleWorkForm"
          :work="currentWork"
          @save="saveClick"
          @cancel="cancelClick"
        )
        ul.works__list
          .works__item.works__new-item
            btn(type="square" title="Добавить работу" @click="addNew")
          li.works__item.works__loaded-item(v-for="work in works" :key="work.id")
            work-card(
              :work="work"
              @remove="removeWork($event, work.id)"
              @edit="editWork($event, work.id)"
            )
            
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
    btn: () => import("../../components/button"),
    workCard: () => import("../../components/workCard"),
    workForm: () => import("../../components/workForm")
  },
  data() {
    return {
      showWorkForm: false,
      titleWorkForm: "",
      isEdit: false, 
      currentWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
      }
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
      removeWorksAction: "works/remove",
      editWorksAction: "works/edit",
      showTooltip: "tooltips/show"
    }),
    addNew() {
      this.showWorkForm = true;
      this.titleWorkForm = "Добавление работы";
      this.isEdit = false;
      this.currentWork = {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {}
      }
    },
    async saveNewWork(work) {
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
    async saveEditWork(work) {
      try {
        await this.editWorksAction(work);

        this.showTooltip({
          text: "Работа отредактирована",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    saveClick(work) {
      this.showWorkForm = false;

      if (this.isEdit) {
        this.saveEditWork(work);
      } else {
        this.saveNewWork(work);
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
    },
    async removeWork($event, id) {
      try {
        await this.removeWorksAction(id);

        this.showTooltip({
          text: "Работа удалена",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    editWork($event, id) {
      this.showWorkForm = true;
      this.titleWorkForm = "Редактирование работы";
      this.currentWork = {...this.works.find(work => work.id === id)};
      this.isEdit = true;
    }
  },
  created() {
    this.fetchWorks();
  }
}
</script>

<style lang="postcss" scoped src="./works.pcss"></style>