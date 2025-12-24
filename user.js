const supabaseClient = supabase.createClient(
  "https://qkpbggwaxnjwqdmqbbpz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcGJnZ3dheG5qd3FkbXFiYnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0ODA5MzksImV4cCI6MjA4MjA1NjkzOX0.qqHPESSXRgP0FECZBReJvKmJKigkzHoXbEU3s7XvJSA"
);

async function protectUser() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) location.href = "index.html";
}
protectUser();

async function loadPSV() {
  const { data, error } = await supabaseClient
    .from("psv_data")
    .select("tag_no,set_pressure,service")
    .order("id", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  const list = document.getElementById("psvList");
  list.innerHTML = "";

  data.forEach(psv => {
    list.innerHTML += `
      <tr>
        <td>${psv.tag_no}</td>
        <td>${psv.set_pressure}</td>
        <td>${psv.service}</td>
      </tr>
    `;
  });
}

async function logout() {
  await supabaseClient.auth.signOut();
  location.href = "index.html";
}

loadPSV();
