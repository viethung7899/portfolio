<script lang="ts">
  import Icon from "@iconify/svelte";
  const inputStyle = "focus:border-orange-500 focus:dark:border-teal-600";
  const myEmail = "viethung07081999@gmail.com";
  let success: boolean | undefined;
  let loading = false;

  let name = "";
  let email = "";
  let message = "";

  const handleSubmit = async () => {
    loading = true;
    const body = {
      access_key: import.meta.env.PUBLIC_WEB3_FORMS_KEY,
      name,
      email,
      message,
      subject: `New message from ${name}`
    };
    console.log(body);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .finally(() => (loading = false));
    success = !!res.success;
  };
</script>

<div class="py-12">
  <h2 class="font-bold text-3xl mb-4">Contact me</h2>
  <p class="mb-4 text-black/50 dark:text-white/50">
    You can fill out the form below and directly email me at
    <a
      href={`mailto:${myEmail}`}
      class="font-medium text-transparent bg-gradient-to-r bg-clip-text 
      from-red-500 to-yellow-500 dark:from-sky-500 dark:to-green-500"
    >
      {myEmail}
    </a>
  </p>
  <form
    class="flex flex-col items-start gap-y-6 w-full max-w-screen-sm"
    on:submit|preventDefault={handleSubmit}
  >
    <input
      type="hidden"
      name="access_key"
      value={import.meta.env.PUBLIC_WEB3_FORMS_KEY}
    />
    <input
      name="name"
      autocomplete="off"
      placeholder="Name*"
      type="text"
      class={inputStyle}
      required
      bind:value={name}
    />
    <input
      name="email"
      autocomplete="off"
      placeholder="Email*"
      type="email"
      class={inputStyle}
      required
      bind:value={email}
    />
    <textarea
      name="message"
      placeholder="Message*"
      type="email"
      rows={5}
      class={inputStyle}
      required
      bind:value={message}
    />
    <div class="flex items-center gap-4">
      <button
        class="p-2 rounded-md text-white bg-orange-500 hover:enabled:bg-orange-600 dark:bg-teal-600 hover:dark:enabled:bg-teal-700 transition disabled:bg-opacity-50"
        disabled={loading}
        type="submit"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {#if success}
        <span class="flex items-center gap-2"
          ><Icon icon="fa6-solid:check" class="w-4 h-4 text-green-600" /> Thank you
          for your feedback.</span
        >
      {:else if success === false}
        <span class="flex items-center gap-2"
          ><Icon icon="fa6-solid:xmark" class="w-4 h-4 text-red-600" /> Please try
          again later.</span
        >
      {/if}
    </div>
  </form>
</div>

<style>
  input,
  textarea {
    @apply border-slate-500/30 border-2 placeholder:opacity-40 rounded-md bg-transparent py-2 px-4 focus:outline-none w-full;
  }
</style>
