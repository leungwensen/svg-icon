const iconize = require('../../lib/iconize');

iconize(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<svg-icon type="ant-design" name="aliwangwang" class="self-define"></svg-icon>
<svg-icon type="material-design" name="3d-rotation" class="self-define"></svg-icon>
</body>
</html>
`, {
  sprite: true
}, (result) => {
  console.log(result);
});
