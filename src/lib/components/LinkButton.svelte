<script lang="ts">
	import { enhance } from '$app/forms';
	import {goto} from '$app/navigation'
	import {page} from '$app/state'
  export let text: string;
  export let actionText: string;
  
</script>

<div>
	<button class="button" name="action" value={actionText}>
		<div>
		  <div>
			<div>{text.toUpperCase()}</div>
		  </div>
		</div>
	  </button>
</div>

<style>
.button {
  --stone-50: #183e4b;
  --stone-800: #8669d7;
  --yellow-400: #f6b7d6;

  
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  line-height: 1;
  font-size: 1rem;
  border-radius: 1rem;
  outline: 2px solid transparent;
  outline-offset: 6px;
  color: var(--stone-50);

  &:active {
    outline-color: var(--yellow-400);
  }

  &:focus-visible {
    outline-color: var(--yellow-400);
    outline-style: dashed;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    height: 200%;
    max-height: 100px;
    aspect-ratio: 1;
    margin: auto;
    background: #183e4b;
    clip-path: polygon(
      100% 50%,
      91.48% 56.57%,
      97.55% 65.45%,
      87.42% 69.07%,
      90.45% 79.39%,
      79.7% 79.7%,
      79.39% 90.45%,
      69.07% 87.42%,
      65.45% 97.55%,
      56.57% 91.48%,
      50% 100%,
      43.43% 91.48%,
      34.55% 97.55%,
      30.93% 87.42%,
      20.61% 90.45%,
      20.3% 79.7%,
      9.55% 79.39%,
      12.58% 69.07%,
      2.45% 65.45%,
      8.52% 56.57%,
      0% 50%,
      8.52% 43.43%,
      2.45% 34.55%,
      12.58% 30.93%,
      9.55% 20.61%,
      20.3% 20.3%,
      20.61% 9.55%,
      30.93% 12.58%,
      34.55% 2.45%,
      43.43% 8.52%,
      50% 0%,
      56.57% 8.52%,
      65.45% 2.45%,
      69.07% 12.58%,
      79.39% 9.55%,
      79.7% 20.3%,
      90.45% 20.61%,
      87.42% 30.93%,
      97.55% 34.55%,
      91.48% 43.43%
    );

    animation: star-rotate 4s linear infinite;
  }

  &:active::before {
    opacity: 1;
  }

  & > div {
    padding: 2px;
    border-radius: 1rem;
    background-color: var(--yellow-400);
    transform: translate(-4px, -4px);
    transition: all 150ms ease;
    box-shadow:
      0.5px 0.5px 0 0 var(--yellow-400),
      1px 1px 0 0 var(--yellow-400),
      1.5px 1.5px 0 0 var(--yellow-400),
      2px 2px 0 0 var(--yellow-400),
      2.5px 2.5px 0 0 var(--yellow-400),
      3px 3px 0 0 var(--yellow-400),
      0 0 0 2px var(--stone-800),
      0.5px 0.5px 0 2px var(--stone-800),
      1px 1px 0 2px var(--stone-800),
      1.5px 1.5px 0 2px var(--stone-800),
      2px 2px 0 2px var(--stone-800),
      2.5px 2.5px 0 2px var(--stone-800),
      3px 3px 0 2px var(--stone-800),
      3.5px 3.5px 0 2px var(--stone-800),
      4px 4px 0 2px var(--stone-800),
      0 0 0 4px var(--stone-50),
      0.5px 0.5px 0 4px var(--stone-50),
      1px 1px 0 4px var(--stone-50),
      1.5px 1.5px 0 4px var(--stone-50),
      2px 2px 0 4px var(--stone-50),
      2.5px 2.5px 0 4px var(--stone-50),
      3px 3px 0 4px var(--stone-50),
      3.5px 3.5px 0 4px var(--stone-50),
      4px 4px 0 4px var(--stone-50);

    .button:active & {
      transform: translate(0, 0);
      box-shadow:
        0 0 0 0 var(--yellow-400),
        0 0 0 0 var(--yellow-400),
        0 0 0 0 var(--yellow-400),
        0 0 0 0 var(--yellow-400),
        0 0 0 0 var(--yellow-400),
        0 0 0 0 var(--yellow-400),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 2px var(--stone-800),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50),
        0 0 0 4px var(--stone-50);
    }

    & > div {
      position: relative;
      pointer-events: none;
      border-radius: calc(1rem - 2px);
      background-color: var(--stone-800);

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 1rem;
        opacity: 0.1;
        background-image: radial-gradient(
            rgb(255 255 255 / 80%) 20%,
            transparent 20%
          ),
          radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
        background-position:
          0 0,
          4px 4px;
        background-size: 8px 8px;
        mix-blend-mode: hard-light;
        box-shadow: inset 0 0 0 1px var(--stone-800);
        animation: dots 0.4s infinite linear;
        transition: opacity 150ms ease;
      }

      & > div {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.75rem 1.25rem;
        gap: 0.25rem;
        filter: drop-shadow(0 -1px 0 var(--stone-800));

        &:active {
          filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.1));
        }

        &:active {
          transform: translateY(2px);
        }
      }
    }
  }
}

@keyframes star-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes dots {
  0% {
    background-position:
      0 0,
      4px 4px;
  }
  100% {
    background-position:
      8px 0,
      12px 4px;
  }
}

@media all {
  .button {
    &:active,
    &:focus-visible {
      outline-color: var(--yellow-400);
    }
  }
}

</style>
