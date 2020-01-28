<script>
  import { fade } from "svelte/transition";
  import ky from "ky-universal";

  let title = "Pozole...";
  let icon = "thinking"
  let status = getPozoleStatus();

  async function getPozoleStatus() {
    let res = await ky("/api").json();
    if (res.hasPozole) {
      title = "There's pozole!";
      icon = "thumbs-up"
    } else {
      title = "No pozole.";
      icon = "thumbs-down"
    }
    return res.hasPozole;
  }
</script>

<style>
  main {
    padding: 3vw;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-size: 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  p {
    width: fit-content;
    font-size: 4rem;
    margin: 0;
    font-weight: 700;
  }

  .loading {
    width: fit-content;
    animation: shake 0.1s;
    animation-iteration-count: infinite;
    font-size: 4rem;
  }

  .answer {
    height: fit-content;
    font-size: 29rem;
    font-weight: 700;
    line-height: 0.8;
  }

  .answer:hover {
    animation: shake 0.1s;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
</style>

<main>
  <p>Is it pozole week at Laughing Planet?</p>
  {#await status}
    <p class="loading">Pozole...</p>
  {:then value}
    {#if value}
      <p class="answer">Yes</p>
    {:else}
      <p class="answer">No</p>
    {/if}
  {:catch}
    <p>Something went wrong</p>
  {/await}
</main>

<svelte:head>
  <title>{title}</title>
  <link rel='icon' type='image/png' href={`/${icon}.png`}>
</svelte:head>
