const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

async function run() {
  console.log("Fetching global_settings...");
  const { data, error } = await supabase.from('global_settings').select('*').eq('key', 'site_config').single();
  if (error) {
    console.error("Error fetching site_config:", error);
    process.exit(1);
  }
  
  let config = data.value;
  config.handle = "";
  config.whatsapp = "+923091925177";
  config.email = "malikshahzaib1809@gmail.com";
  
  console.log("Updating site_config...");
  const { error: updateError } = await supabase.from('global_settings').update({ value: config }).eq('key', 'site_config');
  if (updateError) {
    console.error("Error updating site_config:", updateError);
    process.exit(1);
  }
  
  console.log("Done updating global_settings.");
}

run();
