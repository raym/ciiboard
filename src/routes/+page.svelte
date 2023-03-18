<script>
	import { dropLast, equals, ifElse, pipe, prop, test, when } from 'ramda';
	const ASCII_CODE_FOR_BACKSPACE = 8;
	$: asciiValue = '';
	$: decimalValue = '';
	$: helpText = '';
	let appendToDecimalValue = (a) => (decimalValue += a);
	let appendToAsciiValue = (a) => (asciiValue += a);
	let backspaceDecimalValue = () => (decimalValue = dropLast(1, decimalValue));
	let backspaceAsciiValue = () => (asciiValue = dropLast(1, asciiValue));
	let clearDecimalValue = () => (decimalValue = '');
	let clearHelpText = () => (helpText = '');
	let convertDecimalValueToAsciiValue = pipe(
		() => decimalValue,
		parseInt,
		ifElse(
			equals(ASCII_CODE_FOR_BACKSPACE),
			backspaceAsciiValue,
			pipe(String.fromCharCode, appendToAsciiValue)
		),
		clearDecimalValue
	);
	let handleKeydown = pipe(
		prop('key'),
		when(test(/\d/), pipe(appendToDecimalValue, clearHelpText)),
		when(equals('Backspace'), backspaceDecimalValue),
		when(equals('Enter'), convertDecimalValueToAsciiValue)
	);
	let showHelpText = () => (helpText = 'just start typing, this field is disabled');
</script>

<svelte:window on:keydown={handleKeydown} />

<title>CiiBoard - an ascii keyboard</title>
<h1>Type the decimal value of an ascii character</h1>
<h2>Then press enter</h2>
<label
	on:click={pipe(clearDecimalValue, showHelpText)}
	on:keypress={pipe(clearDecimalValue, showHelpText)}
>
	<input disabled value={decimalValue} placeholder={helpText} />
</label>
<p>
	For example, type <code>65+enter</code> to print A.
	<br />
	65-90 => A-Z and 97-122 => a-z
</p>
<div class="ascii-value">
	{asciiValue}
</div>

<style>
	h1 {
		font-family: 'Andale Mono', sans-serif;
	}

	h2 {
		font-family: 'Andale Mono', sans-serif;
	}

	input {
		max-width: 500px;
		width: 100%;
	}

	input:disabled {
		pointer-events: none;
	}

	p {
		font-family: 'Andale Mono', sans-serif;
	}

	code {
		background-color: black;
		border-radius: 3px;
		color: white;
		font-family: 'Andale Mono', sans-serif;
		padding: 1px 5px;
	}

	.ascii-value {
		font-family: 'Andale Mono', sans-serif;
		font-size: 42px;
		line-height: 1.5em;
	}
</style>
