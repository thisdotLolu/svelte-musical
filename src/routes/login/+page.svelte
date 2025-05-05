<script>
// @ts-nocheck

    import { Button } from '$lib/components';
    import musicIcon from '../../assets/apple-music.svg'
  </script>

<div class='wrapper'>
  <div class='content'>
    <img src={musicIcon} class='logo' alt='Music'/>
    <h1>USD 0.00 for 3 months of Premium</h1>
    <p>Enjoy ad-free music listening, offline playback, and more. Cancel anytime.</p>
    <div class='button'>
      <Button
      element='a'
      variant='outline'
      href='https://www.spotify.com/'
      target="_blank"
      rel="noopener noreferrer"
      >
        Sign Up On Spotify
      </Button>
      <Button element='a' href='/api/auth/login'>Login</Button>
    </div>
  </div>
  <div class="cover">
    <img src={musicIcon} alt='album'/>
  </div>
</div>

<style lang="scss">
	:global(body) {
		background-color: white;
		height: 100vh;
	}
	.wrapper {
		display: flex;
		width: 100%;
		max-width: 1200px;
		margin: 80px auto 0;
		align-items: center;
		flex-direction: column;
		@include breakpoint.up('md') {
			flex-direction: row;
      justify-content: space-between;
      max-width: 1200px;
		}
	}
	.cover {
		flex: 1;
		margin-top: 40px;
		@include breakpoint.up('md') {
			margin-top: 0;
			margin-left: 20px;
		}
		img {
			max-width: 100%;
		}
	}
	.content {
		flex: 1.8;
		h1 {
			font-size:20px;
		}
		p {
			font-size:20px;
		}
		.buttons {
			margin-top: 40px;
			:global(.button) {
				margin-right: 10px;
				padding: 10px 20px;
				text-transform: uppercase;
			}
		}
		.logo {
			width: 170px;
			max-width: 100%;
			margin-bottom: 30px;
		}
	}
</style>