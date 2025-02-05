<script>
  import { getSuggestedPlan } from "../utils";
  import { marked } from "marked"; // Import Markdown parser

  export let inputValue = '';  
  let suggestedPlan = "";  
  let isLoading = false;

  const onSubmit = async () => {
    isLoading = true;
    try {
      const response = await getSuggestedPlan(inputValue, "JavaScript", "console.log('Hello!')", "YOUR_API_KEY");
      suggestedPlan = marked(response);  // Convert Markdown to HTML
    } catch (error) {
      console.error("Error fetching suggested plan:", error);
      suggestedPlan = "<p style='color: red;'>Failed to fetch plan.</p>";
    } finally {
      isLoading = false;
    }
  };
</script>

<div>
  <input 
    type="text" 
    bind:value={inputValue} 
    placeholder="Enter something..."
  />
  <button on:click={onSubmit} disabled={isLoading}>
    {isLoading ? "Loading..." : "Submit"}
  </button>
  {#if suggestedPlan}
  {@html suggestedPlan}
{/if}

</div>

<style>
  input {
    padding: 0.5rem;
    margin-right: 1rem;
    width: 200px;
  }

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .result {
    margin-top: 1rem;
    padding: 0.5rem;
    /* background: #f9f9f9; */
    border-left: 3px solid #007BFF;
  }

  /* Additional styles for markdown formatting */
  .result h1, .result h2, .result h3 {
    color: #007BFF;
  }
  .result p {
    margin-bottom: 0.5rem;
  }
  .result ul {
    padding-left: 1.5rem;
  }
</style>
