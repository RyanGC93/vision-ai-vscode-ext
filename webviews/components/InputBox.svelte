<script>
  export let inputValue = '';  // `inputValue` will be passed from the parent component

  export let onSubmit = () => {};  // This function will be triggered when the button is clicked
</script>

<div>
  <input 
    type="text" 
    bind:value={inputValue} 
    placeholder="Enter something..."
  />
  <button on:click={() => onSubmit(inputValue)}>Submit</button>
</div>

<style>
  input {
    padding: 0.5rem;
    margin-right: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
