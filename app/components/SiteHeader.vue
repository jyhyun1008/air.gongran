<script setup lang="ts">
const { isScrolled, isMenuOpen, toggleMenu } = useSiteMenu();

const navItems = [
    { to: "/", label: "top" },
    { to: "/sample", label: "sample" },
    { to: "/project", label: "project" },
    { to: "/blog", label: "blog" },
    { to: "/contact", label: "contact" },
];
</script>

<template>
    <header :class="{ scroll: isScrolled }">
        <h1><NuxtLink to="/">GONGRAN</NuxtLink></h1>
        <nav class="menu" :class="{ open: isMenuOpen }">
            <ul>
                <li v-for="item in navItems" :key="item.to">
                    <NuxtLink :to="item.to" @click="toggleMenu(false)">{{ item.label }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
    <button
        class="menu-toggler"
        :class="{ open: isMenuOpen }"
        aria-label="메뉴 열기"
        @click="toggleMenu()"
    ></button>
</template>
