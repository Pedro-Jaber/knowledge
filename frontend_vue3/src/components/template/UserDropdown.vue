<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ store.user.name }}</span>
      <div class="user-dropdown-img">
        <img class="img-fluid" src="@/assets/imgs/avatar.png" alt="User" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <RouterLink to="/admin"><i class="fa fa-cogs"></i> Administração</RouterLink>
      <RouterLink><i class="fa fa-sign-out"></i> Sair</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/config/store";
const store = useStore();
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-button:hover {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
}

.user-dropdown-img {
  margin: 0 1rem;

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-dropdown-img > img {
  width: 37px;
  height: 37px;
  border-radius: 50%;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.25s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  background-color: #ededed;
}
</style>
