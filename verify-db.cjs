const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function verify() {
  console.log("Checking global_settings...");
  const { data, error } = await supabase.from('global_settings').select('*');
  if (error) {
    console.error("Error fetching global_settings:", error);
    process.exit(1);
  }
  
  if (!data || data.length === 0) {
    console.error("❌ global_settings is empty!");
    process.exit(1);
  }

  const settings = data[0];
  console.log("Settings found:", settings);
  
  const phoneOk = settings.value.whatsapp === '+923091925177';
  const emailOk = settings.value.email === 'malikshahzaib1809@gmail.com';
  
  if (phoneOk && emailOk) {
    console.log("✅ Phone and email matched perfectly.");
  } else {
    console.error("❌ Mismatch! Phone:", settings.value.whatsapp, "Email:", settings.value.email);
    process.exit(1);
  }
}

verify();
