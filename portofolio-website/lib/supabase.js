import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// Untuk setup:
// 1. Daftar di https://supabase.com/
// 2. Buat project baru (gratis)
// 3. Dapatkan URL dan anon key dari Settings -> API
// 4. Replace values di bawah ini

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    }
});

// Helper functions untuk database operations

// ============= PROFILE =============
export const profileService = {
    // Get profile data
    async getProfile() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .single();

        if (error) throw error;
        return data;
    },

    // Update profile
    async updateProfile(profileData) {
        const { data, error } = await supabase
            .from('profiles')
            .upsert(profileData)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Upload profile picture
    async uploadProfilePicture(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `profile-${Date.now()}.${fileExt}`;
        const filePath = `profiles/${fileName}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};

// ============= PROJECTS =============
export const projectService = {
    // Get all projects
    async getAllProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get single project
    async getProject(id) {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Add new project
    async addProject(projectData) {
        const { data, error } = await supabase
            .from('projects')
            .insert([projectData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update project
    async updateProject(id, projectData) {
        const { data, error } = await supabase
            .from('projects')
            .update(projectData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete project
    async deleteProject(id) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    // Upload project image
    async uploadProjectImage(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `project-${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};

// ============= CERTIFICATES =============
export const certificateService = {
    // Get all certificates
    async getAllCertificates() {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .order('dateIssued', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get single certificate
    async getCertificate(id) {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Add new certificate
    async addCertificate(certificateData) {
        const { data, error } = await supabase
            .from('certificates')
            .insert([certificateData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update certificate
    async updateCertificate(id, certificateData) {
        const { data, error } = await supabase
            .from('certificates')
            .update(certificateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete certificate
    async deleteCertificate(id) {
        const { error } = await supabase
            .from('certificates')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    // Upload certificate badge
    async uploadCertificateBadge(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `certificate-${Date.now()}.${fileExt}`;
        const filePath = `certificates/${fileName}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};

// ============= STORAGE HELPERS =============
export const storageService = {
    // Delete file from storage
    async deleteFile(filePath) {
        const { error } = await supabase.storage
            .from('images')
            .remove([filePath]);

        if (error) throw error;
        return true;
    },

    // Get file URL
    getPublicUrl(filePath) {
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};

export default supabase;