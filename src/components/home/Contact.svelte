<script>
  const inputStyle = "border-black/50 dark:border-white/50 focus:border-orange-500 focus:dark:border-teal-600"
</script>

<div class="px-4 py-12">
  <h2 class="font-bold text-3xl mb-4">Contact me</h2>
  <p class="mb-4 text-black/50 dark:text-white/50">
    You can fill out the form below and directly email me at 
    <a href="mailto:email@example.com"
      class="font-medium text-transparent bg-gradient-to-r bg-clip-text 
      from-red-500 to-yellow-500 dark:from-blue-500 dark:to-green-500">
      email@example.com
    </a>
  </p>
  <form class="flex flex-col items-start gap-y-6 w-full max-w-screen-sm">
    <input placeholder="Name" type="text" class={inputStyle} />
    <input placeholder="Email" type="email" class={inputStyle} />
    <textarea placeholder="Message" type="email" rows={5} class={inputStyle} />
    <button class="p-2 rounded-md text-white bg-orange-500 hover:bg-orange-600 dark:bg-teal-600 hover:dark:bg-teal-700 transition">Send Message</button>
  </form>
</div>

<style>
  input, textarea {
    @apply border-2 placeholder:opacity-40 rounded-md bg-transparent py-2 px-4 focus:outline-none w-full;
  }
</style>