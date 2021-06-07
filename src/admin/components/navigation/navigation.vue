<template lang="pug">
  nav.navigation-component
    .container
      ul.list
        li.item(
          v-for="link in links" 
          :key="link.id"
        )
          router-link(
            :to="`/${link.alias}`"
            :class="['link', {active: link.active}]"
            @click.native="setActiveLink(link.id)"
          ) {{link.title}}
</template>

<script>
const links = [
  {id: 0, title: "Обо мне", alias: "", active: true},
  {id: 1, title: "Работы", alias: "works", active: false},
  {id: 2, title: "Отзывы", alias: "reviews", active: false}
];

export default {
  data() {
    return {
      links
    }
  },
  methods: {
    setActiveLink(id) {
      this.links = this.links.map(link => {
        link.active = link.id === id;

        return link
      })
    }
  }
}
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>