<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>SVG icons</title>
  <link rel="stylesheet" href="./index.css"/>
</head>
<body>
<%= svgSprite %>
<article><% ids.forEach(function (id) { %>
  <figure class="si-figure">
    <div id="figure-<%= id %>">
      <div class="si-wrapper <%= id %>">
        <svg class="si">
          <use xlink:href="#<%= id %>"></use>
        </svg>
      </div>
    </div>
    <figcaption><%= id %></figcaption>
  </figure><% }); %>
</article>
</body>
</html>
