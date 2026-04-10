const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const mobileSignUp = document.getElementById('mobileSignUp');
const mobileSignIn = document.getElementById('mobileSignIn');

if (signUpButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });
}

if (signInButton) {
    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
}

if (mobileSignUp) {
    mobileSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
    });
}

if (mobileSignIn) {
    mobileSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
    });
}

// Supabase Logic
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector('.btn');
    const originalBtnContent = btn.innerHTML;
    
    // Disable button to prevent multiple clicks
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Processing...';

    const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value;
    const email = signupForm.querySelector('input[placeholder="Email Address"]').value;
    const password = signupForm.querySelector('input[placeholder="Password"]').value;

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });

    if (error) {
        if (error.message.includes('already registered')) {
            showToast('Email already in use. Please sign in.', 'info');
            setTimeout(() => {
                container.classList.remove('right-panel-active');
            }, 2000);
        } else {
            showToast(error.message, 'error');
        }
        btn.disabled = false;
        btn.innerHTML = originalBtnContent;
    } else {
        // Create user profile in public table for admin visibility
        if (data.user) {
            await supabaseClient.from('profiles').insert([
                { 
                    id: data.user.id, 
                    full_name: fullName, 
                    email: email 
                }
            ]);
        }

        showToast('Account created! Please sign in.', 'success');
        btn.disabled = false;
        btn.innerHTML = originalBtnContent;
        signupForm.reset();
        setTimeout(() => {
            container.classList.remove('right-panel-active');
        }, 1500);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('.btn');
    const originalBtnContent = btn.innerHTML;

    // Disable button to prevent multiple clicks
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Signing in...';

    const email = loginForm.querySelector('input[placeholder="Email Address"]').value;
    const password = loginForm.querySelector('input[placeholder="Password"]').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        showToast(error.message, 'error');
        // Re-enable button on error
        btn.disabled = false;
        btn.innerHTML = originalBtnContent;
    } else {
        showToast('Welcome back!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }
});

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ri-information-line';
    if (type === 'success') icon = 'ri-checkbox-circle-line';
    if (type === 'error') icon = 'ri-error-warning-line';

    toast.innerHTML = `
        <i class="${icon}"></i>
        <span style="font-family: 'Inter', sans-serif; font-size: 14px;">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
