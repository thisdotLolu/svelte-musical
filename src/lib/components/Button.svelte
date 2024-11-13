<script lang='ts'>
    import type {HTMLAnchorAttributes, HTMLButtonAttributes} from "svelte/elements"

    type Element = $$Generic<'button' | 'a'>

    interface ButtonComponentElements {
        button:HTMLButtonAttributes,
        a: HTMLAnchorAttributes
    }
    type $$Props = ButtonComponentElements & {
        element: Element,
        variant?: 'filled' | 'outline' | 'danger';
        className?:string
    }

    export let element: Element;
    export let variant: 'filled' | 'outline' | 'danger' = 'filled'
    export let className: string = '';
</script>

<svelte:element this={element} class="button button-{variant} {className}" on:click {...$$restProps}>
    <slot/>
</svelte:element>

<style lang='scss'>
    .button{
        display: inline-block;
        border:none;
        font-weight: 600;
        font-size: 14px;
        border-radius: 20px;
        cursor: pointer;
        padding: 7px 15px;
        text-decoration:none;
        &.button-filled {
            background-color: #000;
            color: white;
            border: 2px solid #000;
        }
        &.button-outline{
            background-color: white;
            color: #000;
            border:2px solid #000;
        }
        &.button-danger{
            background-color: red;
            color: white;
            border: 2px solid red;
        }
        &:disabled{
            opacity: 0.8;
            cursor: not-allowed;
        }
    }
</style>