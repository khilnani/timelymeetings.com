const Home = () => `

<div class="content">

    <h1>Meeting Countdown Timer</h1>

    <p class="meetingTime"><span id="meetingTime"></span></p>

    <div id="clockdiv">
        <div>
        <span class="hours"></span>
        <div class="clocktext">Hours</div>
        </div>
        <div>
        <span class="minutes"></span>
        <div class="clocktext">Minutes</div>
        </div>
        <div>
        <span class="seconds"></span>
        <div class="clocktext">Seconds</div>
        </div>
    </div>

    <div>

        <p>
        <label class="label" for="meetingDuration">Meeting duration:</label>
        <select class="select" name="meetingDuration" id="meetingDuration" onchange="onDurationChange()">
            <option value="15">15 mins</option>
            <option value="30" selected>30 mins</option>
            <option value="45">45 mins</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
            <option value="150">2.5 hours</option>
            <option value="180">3 hours</option>
        </select>
        </p>

        <p>
        <label class="label" for="meetingSpeedy">End 5 minutes early?</label>
        <input class="checkbox" type="checkbox" id="meetingSpeedy" name="meetingSpeedy" checked
            onchange="onSpeedyChange()" />
        </p>

        <p>
        <label class="label" for="meetingSlot">Meeting start time: </label>
        <select class="select" name="meetingSlot" id="meetingSlot" onchange="onSlotChange()">
            <option value="-1" selected>Loading ...</option>
        </select>
        </p>
    </div>

    <p><span class="tinyText"><a href="https://github.com/khilnani/timelymeetings.com" target="_blank">Github</a> | <a href="https://khilnani.org" target="_blank">Nik Khilnani</a></span></p>

</div>

`;

export default Home;