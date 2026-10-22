<script setup lang="ts">
useSeoMeta({ title: "GONGRAN | 공란공항" });
definePageMeta({ contentWidth: "wide" });

// each card links into the sample list pre-filtered by its primary tag
const fields = [
    { title: "작편곡", desc: "이곳에 설명이 들어갑니다.", tag: "음악" },
    { title: "믹싱", desc: "이곳에 설명이 들어갑니다.", tag: "음악" },
    { title: "일러스트", desc: "이곳에 설명이 들어갑니다.", tag: "일러스트" },
    { title: "영상", desc: "이곳에 설명이 들어갑니다.", tag: "영상" },
];

const { data: latestPosts } = await useAsyncData("home-latest-posts", () =>
    queryCollection("blog").order("date", "DESC").limit(3).all()
);
</script>

<template>
    <div class="home-hero">
        <img
            class="home-hero-image"
            src="https://bucket.howeverina.studio/gongran/74c57f2b-9d99-46bd-8494-19c91709c3fb.webp"
            alt=""
        />
        <div class="home-hero-text">
            <p class="home-eyebrow">GONGRAN STUDIO</p>
            <h2>공란_공항</h2>
            <p class="home-lead">
                우리는 빈칸에서 출발하여 각자의 삶을 이어나가다가, 언젠가 긴긴 여행을 마치고 빈칸으로 다시 돌아옵니다.
            </p>
            <p class="home-lead">당신의 목적지는 어디인가요?</p>
        </div>
    </div>

    <section class="home-section">
        <div class="home-section-head">
            <h3>작업자 소개</h3>
        </div>
        <div class="profile-card">
            <div class="profile-avatar">
                <img
                    src="https://bucket.howeverina.studio/gongran/30a63bf9-6c26-4c8b-ac6a-fff110600fdd.webp"
                    alt="연이나"
                />
            </div>
            <dl class="inline">
                <dt>이름</dt>
                <dd>연이나</dd>
                <dt>한줄소개</dt>
                <dd>연로자 연소자 여러분 하이나, 연이나입니다!</dd>
                <dt>활동</dt>
                <dd>유튜브 / 치지직 / 크레페 등</dd>
            </dl>
        </div>
    </section>

    <section class="home-section">
        <div class="home-section-head">
            <h3>작업 분야</h3>
            <NuxtLink to="/sample">샘플 전체 보기 →</NuxtLink>
        </div>
        <div class="field-grid">
            <NuxtLink
                v-for="field in fields"
                :key="field.title"
                :to="{ path: '/sample', query: { tag: field.tag } }"
                class="field-card"
            >
                <span class="field-card-title">{{ field.title }}</span>
                <p class="field-card-desc">{{ field.desc }}</p>
                <span class="field-card-more">샘플 보기 →</span>
            </NuxtLink>
        </div>
    </section>

    <section v-if="latestPosts?.length" class="home-section">
        <div class="home-section-head">
            <h3>최근 글</h3>
            <NuxtLink to="/blog">블로그 전체 보기 →</NuxtLink>
        </div>
        <div class="post-grid">
            <ContentCard v-for="post in latestPosts" :key="post.path" :item="post" />
        </div>
    </section>
</template>
