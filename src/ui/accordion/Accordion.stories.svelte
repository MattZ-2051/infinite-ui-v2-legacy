<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Accordion from './Accordion.svelte';
  import AccordionGroup from './AccordionGroup.svelte';

  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>

<Meta title="UI / Accordion" component={AccordionGroup} subcomponents={{ Accordion }} />

<Template let:args>
  <AccordionGroup class="m-5" {...args}>
    <Accordion id="accordion-1" title="Title 1">{content}</Accordion>
    <Accordion id="accordion-2" title="Title 2">{content}</Accordion>
    <Accordion id="accordion-3" title="Title 3">{content}</Accordion>
  </AccordionGroup>
</Template>

<Story name="Default" args={{ active: 'accordion-1' }} />
<Story name="Multiple" args={{ multiple: true, active: ['accordion-1', 'accordion-2', 'accordion-3'] }} />
