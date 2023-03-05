<script lang="ts">
  import Icon from "@iconify/svelte";
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
  <p class="mb-4">
    You can fill out the form below and directly email me at
    <a
      href={`mailto:${myEmail}`}
      class="font-medium text-primary"
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
      class="input input-bordered w-full"
      name="name"
      autocomplete="off"
      placeholder="Name*"
      type="text"
      required
      bind:value={name}
    />
    <input
      class="input input-bordered w-full"
      name="email"
      autocomplete="off"
      placeholder="Email*"
      type="email"
      required
      bind:value={email}
    />
    <textarea
      class="textarea input-bordered w-full"
      name="message"
      placeholder="Message*"
      rows={5}
      required
      bind:value={message}
    />
    <div class="flex items-center gap-4">
      <button class="btn btn-primary" disabled={loading} type="submit">
        {loading ? "Sending..." : "Send Message"}
      </button>
      {#if success}
        <span class="flex items-center gap-2"
          ><Icon icon="fa6-solid:check" class="w-4 h-4 text-success" /> Thank you
          for your feedback.</span
        >
      {:else if success === false}
        <span class="flex items-center gap-2"
          ><Icon icon="fa6-solid:xmark" class="w-4 h-4 text-error" /> Please try
          again later.</span
        >
      {/if}
    </div>
  </form>
</div>
