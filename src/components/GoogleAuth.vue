<script setup>
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { auth, GoogleAuthProvider, signInWithPopup, doc, db, setDoc } from '@/firebase'
import ModalComponent from './ModalComponent.vue'

const user = ref(null)
const isModalVisible = ref(false)

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const userData = {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      uid: result.user.uid
    }

    await setDoc(doc(db, 'users', userData.uid), userData)
    Cookies.set('user', JSON.stringify(userData), { expires: 7 })
    user.value = userData
  } catch (error) {
    console.error('Error during Google sign-in:', error)
  }
}

const signOut = async () => {
  try {
    await auth.signOut()
    Cookies.remove('user')
    user.value = null
    isModalVisible.value = false 
  } catch (error) {
    console.error('Error during sign-out:', error)
  }
}

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const updateUserData = (updatedUser) => {
  user.value = updatedUser
}

onMounted(() => {
  const savedUser = Cookies.get('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
</script>

<template>
  <div class="p-6 space-y-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
    <div class="text-center">
      <button
        v-if="!user"
        @click="signInWithGoogle"
        class="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Войти с помощью Google
      </button>
    </div>


    <ModalComponent
      :isVisible="isModalVisible"
      :user="user"
      @close="closeModal"
      @update="updateUserData"
      class="transition-opacity duration-300"
    />
    

    <div v-if="user" class="text-center space-y-4">
      <h3 class="text-2xl font-semibold">Добро пожаловать, {{ user.displayName }}</h3>
      <img
        :src="user.photoURL"
        alt="User Avatar"
        class="w-32 h-32 rounded-full mx-auto border-2 border-gray-200 shadow-lg"
      />

      
      <button
      v-if="user"
      @click="openModal"
      class="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Настройки
    </button>

      <button
        @click="signOut"
        class="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Выход
      </button>
    </div>
  </div>
</template>
