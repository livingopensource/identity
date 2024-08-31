<script>
    import bgImage from "$lib/assets/images/bug_fixing.svg";
    import { slide } from "svelte/transition";
    import { 
        Link,
        TextInput,
        Button,
        ImageLoader
    } from "carbon-components-svelte";

    import {
        Login
    } from "carbon-icons-svelte"
</script>

<svelte:head>
	<title>SwiftCloud Indentity Platform</title>
	<meta name="description" content="SwiftCloud Identity" />
</svelte:head>

<div class="grid grid-cols-4 gap-4 m-10 p-10">
    <div class="col-span-0 md:col-span-2 lg:col-span-3" in:slide={{delay: 50, duration: 800, axis: "x"}} out:slide={{delay: 50, duration: 800, axis: "x"}}>
        <ImageLoader src={bgImage} />
    </div>
    <div class="col-span-4 md:col-span-2 lg:col-span-1">
            <h1 class="text-3xl font-bold">Forgot password</h1>
            <br />
            <p>Want to get back to log in page? <Link href="/">Click here</Link></p>
            <br />
            <hr />
            <br />
            <TextInput labelText="Email" placeholder="user@example.co.zm"/>
            <br />
            <div class="flex justify-end">
                <Button icon={Login}>Reset Password</Button>
            </div>
            <br />
            <br />
            <hr />
            <br />
    </div>
</div>
