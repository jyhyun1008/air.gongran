<script setup lang="ts">
const navItems = [
    { to: "/sample", label: "sample" },
    { to: "/project", label: "project" },
    { to: "/blog", label: "blog" },
    { to: "/contact", label: "contact" },
];
</script>

<template>
    <header class="site-header">
        <div class="site-header-inner">
            <h1 class="brand"><NuxtLink to="/">GONGRAN</NuxtLink></h1>
            <nav class="site-nav">
                <ul>
                    <li v-for="item in navItems" :key="item.to">
                        <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
