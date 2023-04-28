window.onload = () => {
  const backdrop = document.querySelector(".backdrop");
  const sideDrawer = document.querySelector(".mobile-nav");
  const menuToggle = document.querySelector("#side-menu-toggle");

  function backdropClickHandler() {
    backdrop.style.display = "none";
    sideDrawer.classList.remove("open");
  }

  function sideDrawerClickHandler() {
    backdrop.style.display = "none";
    sideDrawer.classList.remove("open");
  }

  function menuToggleClickHandler() {
    backdrop.style.display = "block";
    sideDrawer.classList.add("open");
  }

  backdrop.addEventListener("click", backdropClickHandler);
  sideDrawer.addEventListener("click", sideDrawerClickHandler);
  menuToggle.addEventListener("click", menuToggleClickHandler);
};
