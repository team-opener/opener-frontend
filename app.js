const fixHeader = () => {
  const target = document.querySelector("#targetHeader");
  const targetHeight = target.offsetHeight;
  console.log(`${targetHeight}px`);

  window.addEventListener("scroll", function(e) {
    const scrollHeight = window.scrollY;
    if (scrollHeight > targetHeight) {
      target.classList.add("active");
    } else {
      target.classList.remove("active");
    }
  });
};

fixHeader();
