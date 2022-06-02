<script lang="ts">
  export let href: string;
  export let content: string;
</script>

<a class="underline text-gray-900 hover:no-underline font-bold" {href} target="_blank" rel="noreferrer">
  {content}
</a>
