<template lang="pug">
  nav.navigation-component
    .container
      ul.list
        li.item(
          v-for="link in links" 
          :key="link.id"
        )
          a(
            :href="`/${link.alias}`"
            :class="['link', {active: link.active}]"
          ) {{link.title}}
</template>

<script>
const links = [
  {id: 0, title: "Обо мне", alias: "about", active: true},
  {id: 0, title: "Работы", alias: "works", active: false},
  {id: 0, title: "Отзывы", alias: "reviews", active: false}
];

export default {
  data() {
    return {
      links
    }
  }
}
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>