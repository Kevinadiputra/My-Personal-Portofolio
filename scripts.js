document.querySelector("form").addEventListener("submit", function (event) {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var message = document.getElementById("message").value;

	if (!name || !email || !message) {
		alert("Harap isi semua bidang.");
		event.preventDefault();
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll(".section");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				}
			});
		},
		{
			threshold: 0.1,
		}
	);

	sections.forEach((section) => {
		observer.observe(section);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	});

	const sections = document.querySelectorAll(".section");
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				} else {
					entry.target.classList.remove("visible");
				}
			});
		},
		{
			threshold: 0.1,
		}
	);

	sections.forEach((section) => {
		observer.observe(section);
	});
});
