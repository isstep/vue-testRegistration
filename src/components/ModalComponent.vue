<script setup>
import { ref } from 'vue';
import { db, doc, setDoc } from '@/firebase';

const props = defineProps({
  isVisible: Boolean,
  user: Object
});

const emit = defineEmits(['close', 'update']);

const phoneNumber = ref('');
const shippingAddress = ref('');

const submitForm = async () => {
  if (props.user) {
    try {
      const userData = {
        ...props.user,
        phoneNumber: phoneNumber.value,
        shippingAddress: shippingAddress.value
      };
      await setDoc(doc(db, 'users', props.user.uid), userData);
      emit('update', userData);
      emit('close');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
};

const close = () => {
  emit('close');
};
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-60" @click="close"></div>
      <div class="relative bg-white p-8 rounded-lg shadow-lg w-96 max-w-md mx-4">
        <button @click="close" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 class="text-2xl font-semibold mb-6 text-center">Complete Your Profile</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-5">
            <label for="phoneNumber" class="block text-sm font-medium mb-2">Phone Number:</label>
            <input
              id="phoneNumber"
              v-model="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>
          <div class="mb-5">
            <label for="shippingAddress" class="block text-sm font-medium mb-2">Shipping Address:</label>
            <input
              id="shippingAddress"
              v-model="shippingAddress"
              type="text"
              placeholder="Enter your shipping address"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>
          <div class="flex justify-end gap-4">
            <button
              type="submit"
              class="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              @click="close"
              class="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
