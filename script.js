/* =========================================
   THESIS EXPERIMENT: CRYSTAL CLEAR
   CHUNKING CONDITION
   =========================================
*/

// 1. CONFIGURATION
const MY_SUPABASE_URL = 'https://upvqhxggqlnslxymwzwq.supabase.co';
const MY_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdnFoeGdncWxuc2x4eW13endxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTkyNjgsImV4cCI6MjA5MDI3NTI2OH0.S6mIXXY850WpPXHdJ9gjHltEvWi_jncfWVaaEYgpoVw';

const db = supabase.createClient(MY_SUPABASE_URL, MY_SUPABASE_KEY);

// 2. STATE VARIABLES
let experimentStart = 0;
let currentParticipant = "";
let currentChunkIndex = 0;

// 3. CHUNK CONTENT
// Key terms wrapped in <span class="highlight"> for red bold styling
const chunks = [
    {
        title: "Rights You Grant Us — Part 1",
        content: `
            <p>Many of our Services let you create, upload, post, send, receive and store content.
            When you do that, you retain whatever ownership rights to that content you had to begin with.
            But, you grant us a licence to use that content.</p>

            <p>For all content you create using the Services, you grant Crystal Clear and our affiliates
            a <span class="highlight">worldwide, royalty-free</span> (meaning that there is
            <span class="highlight">no ongoing payment to you required</span>), sublicencable and
            transferable licence to host, store, cache, use, display, reproduce, modify, adapt, edit,
            publish, analyse, transmit and distribute that content, including the
            <span class="highlight">name, image, likeness or voice</span> of anyone featured in it.</p>

            <p>This licence is for the limited purpose of operating, developing, providing, promoting
            and improving the Services and researching and developing new ones.</p>
        `
    },
    {
        title: "Rights You Grant Us — Part 2",
        content: `
            <p>We call Public Story submissions and any other content you submit to public Services
            "Public Content". Because Public Content is inherently public, you grant Crystal Clear,
            our affiliates, other users of the Services and our business partners a
            <span class="highlight">worldwide, royalty-free and irrevocable right and licence</span>
            to create derivative works from, promote, exhibit, broadcast, syndicate, reproduce,
            distribute, and publicly display all or any portion of your Public Content in any form
            and in any and all media or distribution methods, now known or later developed.</p>

            <p>This licence applies to the
            <span class="highlight">name, image, likeness and voice</span> of anyone featured in
            Public Content that you create, upload, post, send or appear in.</p>
        `
    },
    {
        title: "Rights You Grant Us — Part 3",
        content: `
            <p>This means, among other things, that
            <span class="highlight">you will not be entitled to any compensation</span> if your content,
            including videos, photos, sound recordings, name, image, likeness or voice, are used by us,
            our affiliates, users of the Services or our business partners.</p>

            <p>The licences granted by you for Public Content continue for so long as the Public Content
            is on the Services and for a
            <span class="highlight">reasonable period of time after you remove or delete</span>
            the Public Content from the Services (provided we may
            <span class="highlight">retain server copies of your Public Content indefinitely</span>).</p>

            <p>We, Crystal Clear Inc., our affiliates and our third-party partners may place
            <span class="highlight">personalised advertising</span> on the Services based on
            information you provide us, we collect or we obtain about you.</p>
        `
    },
    {
        title: "Memories",
        content: `
            <p>Memories is our personalised data-storage service. Your content in Memories
            <span class="highlight">might become unavailable</span> for any number of reasons,
            including things like an operational glitch or a decision on our end to terminate
            your account.</p>

            <p>Since <span class="highlight">we cannot guarantee that your content will always
            be available</span>, we recommend
            <span class="highlight">keeping a separate copy</span> of content you save to Memories.</p>

            <p>We make no promise that Memories will be able to accommodate your precise storage needs.
            We reserve the right to set storage limits for Memories or to prohibit certain types of
            content from being eligible for use with Memories, and we may change these limits from
            time to time in our sole discretion.</p>
        `
    },
    {
        title: "Account Deletion",
        content: `
            <p>While you may delete your account for a number of reasons, Crystal Clear makes it
            exceedingly easy to do so. Any user can delete their account at any point, without
            hassle or explanation to Crystal Clear.</p>

            <p>Once you have decided on deleting your account and have gone through the process,
            Crystal Clear will go through your account for our deletion protocol. First,
            <span class="highlight">all of your messages will be scanned and saved</span>, alongside
            every post you have deleted or archived. These will be packaged and set up as an
            <span class="highlight">accessible page on our main website</span>.</p>

            <p>Crystal Clear will announce your departure on the first of every month.
            <span class="highlight">Everyone will be able to see your correspondences with others,
            as well as your deleted posts, indefinitely.</span></p>
        `
    },
    {
        title: "Personalised Recommendations",
        content: `
            <p>Our Services provide a personalised experience to make them more relevant and
            engaging for you. We will recommend content, advertising and other information to you
            based on what we know and infer about your and others' interests from use of our Services.</p>

            <p>It is necessary for us to
            <span class="highlight">handle your personal information</span> for this purpose,
            as we explain in our Privacy Policy. Personalisation is also a
            <span class="highlight">condition of our contract</span> with you for us to be able
            to do so, unless you opt to receive less personalisation in the Services.</p>
        `
    }
];

// 4. NAVIGATION — LANDING TO SIGNUP
window.showSignup = function() {
    document.getElementById('landing-screen').style.display = 'none';
    document.getElementById('signup-screen').style.display = 'flex';
};

// 5. START EXPERIMENT — show first chunk and start timer
window.startExperiment = function() {
    const inputField = document.getElementById('username');

    if (!inputField || !inputField.value) {
        alert("Please enter a username to continue.");
        return;
    }

    currentParticipant = inputField.value;
    experimentStart = Date.now();

    document.getElementById('signup-screen').style.display = 'none';

    currentChunkIndex = 0;
    showChunk(currentChunkIndex);
    document.getElementById('tos-chunked-overlay').style.display = 'flex';

    console.log("Timer started for:", currentParticipant);
};

// 6. RENDER CHUNK
function showChunk(index) {
    const chunk = chunks[index];
    const total = chunks.length;

    document.getElementById('chunk-title').textContent = chunk.title;
    document.getElementById('chunk-content').innerHTML = chunk.content;

    // Progress bar
    const progressPercent = ((index + 1) / total) * 100;
    document.getElementById('chunk-progress-bar').style.width = progressPercent + '%';
    document.getElementById('chunk-progress-label').textContent =
        `Section ${index + 1} of ${total}`;

    // Swap button label on last chunk
    const btn = document.getElementById('chunk-next-btn');
    if (index === total - 1) {
        btn.textContent = 'I Agree ✓';
        btn.classList.add('agree-final');
    } else {
        btn.textContent = 'Next →';
        btn.classList.remove('agree-final');
    }

    // Scroll content back to top on each new chunk
    document.getElementById('chunk-content').scrollTop = 0;
}

// 7. NEXT BUTTON
window.nextChunk = function() {
    if (currentChunkIndex < chunks.length - 1) {
        currentChunkIndex++;
        showChunk(currentChunkIndex);
    } else {
        completeExperiment();
    }
};

// 8. COMPLETE & SAVE
window.completeExperiment = async function() {
    const duration = (Date.now() - experimentStart) / 1000;

    const rowToInsert = {
        username: currentParticipant,
        tos_time: parseFloat(duration.toFixed(2))
    };

    console.log("Saving result...", rowToInsert);

    try {
        const { error } = await db
            .from('experiment_results')
            .insert([rowToInsert]);

        if (error) throw error;

        document.body.style.overflowY = "auto";
        document.getElementById('tos-chunked-overlay').style.display = 'none';
        document.getElementById('signup-screen').style.display = 'none';
        document.getElementById('landing-screen').style.display = 'none';
        document.body.style.backgroundColor = "#f0f2f5";

        const home = document.getElementById('home-screen');
        if (home) home.style.display = 'flex';

        console.log("Complete. Duration:", duration + "s");

    } catch (err) {
        console.error("Supabase Error:", err.message);
        alert("Database error: " + err.message);
    }
};