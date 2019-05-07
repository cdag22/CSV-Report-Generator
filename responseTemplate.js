module.exports.template = `
<header class="jumbotron bg-dark">
    <h1 class="display-4 text-center text-white">CSV Report Generator</h1>
</header>

<main class="container mt-5">
  <div class="row">
    <div class="col-6 m-auto">
      <form action="/upload_csv" method="POST">
        <div class="form-group">
          <label for="csv-file" class="display-5">Input a CSV file</label>
          <textarea name="" id="csv-file" class="form-control" cols="30" rows="10"></textarea>
        </div>
        <div class="form-group">
          <input type="submit" text="Submit" class="btn btn-outline-primary btn-block bt-lg">
        </div>
      </form>
    </div>
    <div class="col-6 m-auto">
      <p>{{ csv }}</p>
    </div>
  </div>
</main>`;