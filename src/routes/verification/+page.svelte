<script>
    import bgImage from "$lib/assets/images/monitor.svg";
    import { slide } from "svelte/transition";
    import { 
        Link,
        TextInput,
        Button,
        InlineNotification,
        ImageLoader,
    } from "carbon-components-svelte";

    import {
        Login
    } from "carbon-icons-svelte";
    /** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>SwiftCloud Identity Platform</title>
	<meta name="description" content="SwiftCloud Identity" />
</svelte:head>

<div class="grid grid-cols-4 gap-4 m-10 p-10">
    <div class="col-span-0 md:col-span-2 lg:col-span-3" in:slide={{delay: 50, duration: 800, axis: "x"}} out:slide={{delay: 50, duration: 800, axis: "x"}}>
        <ImageLoader src={bgImage} />
    </div>
    <div class="col-span-4 md:col-span-2 lg:col-span-1">
        <h1 class="text-3xl font-bold">Verify Account</h1>
        <br />
        <p>Don't have an account? <Link href="/register">Create account</Link></p>
        <br />
        <hr />
        <br />
        {#await data}
            <input type="hidden" />
        {:then serverFlow}
            {#if serverFlow != null && serverFlow.kratos != null && serverFlow.kratos.ui && serverFlow.kratos.ui.action != null}
                {#if serverFlow.kratos?.error != null}
                    <InlineNotification hideCloseButton lowContrast kind="error" title="{serverFlow.kratos.error.message}"/>
                {/if}
                {#if serverFlow.kratos.ui.messages != null}
                    {#each serverFlow.kratos.ui.messages as message}
                        <InlineNotification kind="{message.type}" lowContrast hideCloseButton title="{message.text}" />
                    {/each}
                {/if}
                <form method="post" action="{serverFlow.kratos.ui.action}">
                    {#if serverFlow != null && serverFlow.csrfToken != null}
                        <input type="hidden" value="{serverFlow.csrfToken}" name="csrf_token" />
                    {/if}
                    {#if serverFlow != null && serverFlow.id != null}
                        <input type="hidden" value="{serverFlow.id}" name="flow_id" />
                    {/if}
                    <input type="hidden" name="method" value="code"/>
                    <TextInput labelText="Email" placeholder="user@example.co.zm" name="email" required/>
                    <br />
                    <div class="flex justify-end">
                        <Button icon={Login} type="submit">Verify</Button>
                    </div>
                    <br />
                </form>
            {:else}
                <InlineNotification style="cursor: pointer;" on:click={() => location.href="/verification"} lowContrast hideCloseButton kind="error" title="Something went wrong" subtitle="Please tap here to refresh this page, {serverFlow.kratos.error.message}" />
            {/if}
        {:catch err}
            <InlineNotification kind="error" lowContrast hideCloseButton title="{err.message}" />
        {/await}
        <br />
        <hr />
        <br />
    </div>
</div>
