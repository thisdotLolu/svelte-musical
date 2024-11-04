<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<input/>
<select name="" id="">
    <option value=""></option>
</select>
<button>Button</button>



<style lang="scss">
    @use '@unsass/breakpoint';
    @use '../styles/_function.scss';
    h1{
        color:red;
        @include breakpoint.up('md'){
            color: green;
        }
    }
</style>