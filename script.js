function buildMainActivityContent() {
  return `package tech.alicankorkmaz.portfolio

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.saveable.rememberSaveable
import tech.alicankorkmaz.portfolio.feature.projects.presentation.ProjectsRoute
import tech.alicankorkmaz.portfolio.feature.profile.presentation.ProfileScreen
import tech.alicankorkmaz.portfolio.feature.contact.presentation.ContactScreen

enum class PortfolioDestination {
  Projects,
  Profile,
  Contact,
}

class MainActivity : ComponentActivity() {
  override <span class="keyword">fun</span> onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
      PortfolioApp()
    }
  }
}

@Composable
<span class="keyword">fun</span> PortfolioApp() {
  var destination by rememberSaveable { mutableStateOf(PortfolioDestination.Projects) }

  when (destination) {
    PortfolioDestination.Projects -> ProjectsRoute(
      title = <span class="value">"Career Highlights"</span>,
      subtitle = <span class="value">"LinkedIn-based timeline (latest to past)"</span>,
      ctaLabel = <span class="value">"Open Profile"</span>,
      onOpenProfile = { destination = PortfolioDestination.Profile },
    )
    PortfolioDestination.Profile -> ProfileScreen(
      onOpenContact = { destination = PortfolioDestination.Contact },
    )
    PortfolioDestination.Contact -> ContactScreen(
      onBackToProjects = { destination = PortfolioDestination.Projects },
    )
  }
}

<span class="comment">// :app orchestrates feature modules; it should not own feature business logic.</span>`;
}

const files = {
  settingsGradle: {
    tab: 'settings.gradle.kts',
    status: 'settings.gradle.kts',
    content: `pluginManagement {
  repositories {
    google()
    mavenCentral()
    gradlePluginPortal()
  }
}

dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    google()
    mavenCentral()
  }
}

rootProject.name = <span class="value">"alican-android-portfolio"</span>

include(
  <span class="value">":app"</span>,
  <span class="value">":core:ui"</span>,
  <span class="value">":core:domain"</span>,
  <span class="value">":core:network"</span>,
  <span class="value">":core:testing"</span>,
  <span class="value">":feature:projects"</span>,
  <span class="value">":feature:profile"</span>,
  <span class="value">":feature:contact"</span>,
  <span class="value">":benchmark"</span>,
)

<span class="comment">// Multi-module topology is explicit at the entry point.</span>`
  },
  rootBuildGradle: {
    tab: 'build.gradle.kts',
    status: 'build.gradle.kts (root)',
    content: `plugins {
  alias(libs.plugins.android.application) apply false
  alias(libs.plugins.android.library) apply false
  alias(libs.plugins.jetbrains.kotlin.android) apply false
  alias(libs.plugins.kotlin.serialization) apply false
}

subprojects {
  tasks.withType<Test>().configureEach {
    useJUnitPlatform()
  }
}

<span class="comment">// Build logic is centralized; modules stay lean and focused.</span>`
  },
  versionsToml: {
    tab: 'libs.versions.toml',
    status: 'gradle/libs.versions.toml',
    content: `[versions]
androidGradlePlugin = <span class="value">"8.8.0"</span>
kotlin = <span class="value">"2.1.10"</span>
composeBom = <span class="value">"2025.02.00"</span>
coroutines = <span class="value">"1.10.1"</span>

[libraries]
androidx-compose-bom = { module = <span class="value">"androidx.compose:compose-bom"</span>, version.ref = <span class="value">"composeBom"</span> }
kotlinx-coroutines-core = { module = <span class="value">"org.jetbrains.kotlinx:kotlinx-coroutines-core"</span>, version.ref = <span class="value">"coroutines"</span> }

<span class="comment"># Version catalog keeps dependency governance in one place.</span>`
  },
  appBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':app/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.jetbrains.kotlin.android)
}

android {
  namespace = <span class="value">"tech.alicankorkmaz.portfolio"</span>
}

dependencies {
  implementation(project(<span class="value">":core:ui"</span>))
  implementation(project(<span class="value">":feature:projects"</span>))
  implementation(project(<span class="value">":feature:profile"</span>))
  implementation(project(<span class="value">":feature:contact"</span>))
}

<span class="comment">// App module composes features; feature internals stay isolated.</span>`
  },
  androidManifest: {
    tab: 'AndroidManifest.xml',
    status: ':app/src/main/AndroidManifest.xml',
    content: `<span class="comment">&lt;manifest package="tech.alicankorkmaz.portfolio"&gt;</span>
  &lt;application
    android:name=<span class="value">".PortfolioApplication"</span>
    android:label=<span class="value">"Alican Korkmaz Portfolio"</span>&gt;

    &lt;activity android:name=<span class="value">".MainActivity"</span> android:exported=<span class="value">"true"</span>&gt;
      &lt;intent-filter&gt;
        &lt;action android:name=<span class="value">"android.intent.action.MAIN"</span> /&gt;
        &lt;category android:name=<span class="value">"android.intent.category.LAUNCHER"</span> /&gt;
      &lt;/intent-filter&gt;
    &lt;/activity&gt;
  &lt;/application&gt;
<span class="comment">&lt;/manifest&gt;</span>`
  },
  applicationClass: {
    tab: 'PortfolioApplication.kt',
    status: ':app/src/main/java/tech/alicankorkmaz/portfolio/PortfolioApplication.kt',
    content: `package tech.alicankorkmaz.portfolio

import android.app.Application
import tech.alicankorkmaz.portfolio.core.network.NetworkModule

class PortfolioApplication : Application() {
  override <span class="keyword">fun</span> onCreate() {
    super.onCreate()
    NetworkModule.init(
      baseUrl = <span class="value">"https://api.alicankorkmaz.dev"</span>,
    )
  }
}

<span class="comment">// Application bootstraps shared infra modules exactly once.</span>`
  },
  mainActivity: {
    tab: 'MainActivity.kt',
    status: ':app/src/main/java/tech/alicankorkmaz/portfolio/MainActivity.kt',
    content: buildMainActivityContent()
  },
  coreUiBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':core:ui/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  api(platform(libs.androidx.compose.bom))
  api(libs.androidx.compose.ui)
  api(libs.androidx.compose.material3)
}

<span class="comment">// Shared UI primitives avoid copy-paste across features.</span>`
  },
  designSystemTokens: {
    tab: 'DesignSystemTokens.kt',
    status: ':core:ui/src/main/java/tech/alicankorkmaz/portfolio/core/ui/DesignSystemTokens.kt',
    content: `package tech.alicankorkmaz.portfolio.core.ui

object DesignSystemTokens {
  <span class="keyword">val</span> spacing = object {
    <span class="keyword">const val</span> xs = 4
    <span class="keyword">const val</span> sm = 8
    <span class="keyword">const val</span> md = 16
  }

  <span class="keyword">val</span> radius = object {
    <span class="keyword">const val</span> card = 14
  }
}

<span class="comment">// Core UI is consumed by all feature modules.</span>`
  },
  coreDomainBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':core:domain/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  implementation(libs.kotlinx.coroutines.core)
}

<span class="comment">// Pure contracts + use-case interfaces used across features.</span>`
  },
  dispatcherProvider: {
    tab: 'DispatcherProvider.kt',
    status: ':core:domain/src/main/java/tech/alicankorkmaz/portfolio/core/domain/DispatcherProvider.kt',
    content: `package tech.alicankorkmaz.portfolio.core.domain

import kotlin.coroutines.CoroutineContext

interface DispatcherProvider {
  <span class="keyword">val</span> io: CoroutineContext
  <span class="keyword">val</span> main: CoroutineContext
  <span class="keyword">val</span> default: CoroutineContext
}

<span class="comment">// Abstraction keeps use-cases testable and framework-agnostic.</span>`
  },
  coreNetworkBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':core:network/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
  alias(libs.plugins.kotlin.serialization)
}

dependencies {
  implementation(libs.ktor.client.core)
  implementation(libs.ktor.client.okhttp)
}

<span class="comment">// Transport concerns stay in :core:network, not in features.</span>`
  },
  apiClient: {
    tab: 'ApiClient.kt',
    status: ':core:network/src/main/java/tech/alicankorkmaz/portfolio/core/network/ApiClient.kt',
    content: `package tech.alicankorkmaz.portfolio.core.network

class ApiClient(private <span class="keyword">val</span> baseUrl: String) {
  suspend <span class="keyword">fun</span> get(path: String): String {
    <span class="keyword">return</span> <span class="value">"GET $baseUrl/$path"</span>
  }
}

<span class="comment">// Shared HTTP client used by data sources in feature modules.</span>`
  },
  coreTestingBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':core:testing/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  api(libs.junit)
  api(libs.kotlinx.coroutines.test)
}

<span class="comment">// Reusable fakes and test utilities for module-level tests.</span>`
  },
  testDispatchers: {
    tab: 'TestDispatchers.kt',
    status: ':core:testing/src/main/java/tech/alicankorkmaz/portfolio/core/testing/TestDispatchers.kt',
    content: `package tech.alicankorkmaz.portfolio.core.testing

object TestDispatchers {
  <span class="keyword">fun</span> immediate() = StandardTestDispatcher()
}

<span class="comment">// Shared testing helper imported by all feature test suites.</span>`
  },
  featureProjectsBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':feature:projects/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  implementation(project(<span class="value">":core:ui"</span>))
  implementation(project(<span class="value">":core:domain"</span>))
  implementation(project(<span class="value">":core:network"</span>))
}

<span class="comment">// Feature owns its vertical slice: presentation + domain + data adapters.</span>`
  },
  projectsContract: {
    tab: 'ProjectsContract.kt',
    status: ':feature:projects/src/main/java/tech/alicankorkmaz/portfolio/feature/projects/presentation/ProjectsContract.kt',
    content: `package tech.alicankorkmaz.portfolio.feature.projects.presentation

sealed interface ProjectsIntent {
  data object Refresh : ProjectsIntent
}

data class ProjectsUiState(
  <span class="keyword">val</span> isLoading: Boolean = false,
  <span class="keyword">val</span> items: List<ProjectUiModel> = emptyList(),
  <span class="keyword">val</span> error: String? = null,
)

<span class="comment">// MVVM contract lives inside feature boundary.</span>`
  },
  projectsViewModel: {
    tab: 'ProjectsViewModel.kt',
    status: ':feature:projects/src/main/java/tech/alicankorkmaz/portfolio/feature/projects/presentation/ProjectsViewModel.kt',
    content: `package tech.alicankorkmaz.portfolio.feature.projects.presentation

class ProjectsViewModel(
  private <span class="keyword">val</span> repository: ProjectsRepository,
) : ViewModel() {

  private <span class="keyword">val</span> _state = MutableStateFlow(ProjectsUiState(isLoading = true))
  <span class="keyword">val</span> state = _state.asStateFlow()

  init {
    repository.observeFeatured()
      .onEach { _state.value = ProjectsUiState(items = it.map(::toUiModel)) }
      .launchIn(viewModelScope)
  }
}

<span class="comment">// Feature-level ViewModel; no dependency on other feature modules.</span>`
  },
  projectsScreen: {
    tab: 'ProjectsScreen.kt',
    status: ':feature:projects/src/main/java/tech/alicankorkmaz/portfolio/feature/projects/presentation/ProjectsScreen.kt',
    content: `package tech.alicankorkmaz.portfolio.feature.projects.presentation

@Composable
<span class="keyword">fun</span> ProjectsRoute(
  title: String,
  subtitle: String,
  ctaLabel: String,
  onOpenProfile: () -> Unit,
) {
  <span class="keyword">val</span> highlights = listOf(
    <span class="value">"Current - adesso Turkey (Mobile Software Architect)"</span>,
    <span class="value">"Pre-adesso - Android roles across Istanbul, Levent, Ankara, and Huawei Turkey R&D contexts"</span>,
    <span class="value">"Past - internship to senior Android ownership over 8+ years"</span>,
  )

  Column(
    verticalArrangement = Arrangement.spacedBy(8.dp),
  ) {
    Text(title)
    Text(subtitle)
    highlights.forEach { item ->
      Text(<span class="value">"• $item"</span>)
    }
    Button(onClick = onOpenProfile) { Text(ctaLabel) }
  }
}

<span class="comment">// Public route exported to :app; internals remain private to feature.</span>`
  },
  featureProfileBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':feature:profile/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  implementation(project(<span class="value">":core:ui"</span>))
  implementation(project(<span class="value">":core:domain"</span>))
}

<span class="comment">// Profile feature can evolve independently of Projects feature.</span>`
  },
  profileScreen: {
    tab: 'ProfileScreen.kt',
    status: ':feature:profile/src/main/java/tech/alicankorkmaz/portfolio/feature/profile/presentation/ProfileScreen.kt',
    content: `package tech.alicankorkmaz.portfolio.feature.profile.presentation

@Composable
<span class="keyword">fun</span> ProfileScreen(onOpenContact: () -> Unit) {
  Text(<span class="value">"Alican Korkmaz"</span>)
  Text(<span class="value">"Mobile Software Architect @ adesso Turkey"</span>)
  Text(<span class="value">"8+ years Android • 2K followers • 500+ connections"</span>)
  Text(<span class="value">"Passionate clean coder. Lifelong learner."</span>)
  Button(onClick = onOpenContact) {
    Text(<span class="value">"Contact"</span>)
  }
}

<span class="comment">// Separate feature module keeps ownership clear.</span>`
  },
  featureContactBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':feature:contact/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.library)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  implementation(project(<span class="value">":core:ui"</span>))
}

<span class="comment">// Lightweight feature module for contact entry points.</span>`
  },
  contactScreen: {
    tab: 'ContactScreen.kt',
    status: ':feature:contact/src/main/java/tech/alicankorkmaz/portfolio/feature/contact/presentation/ContactScreen.kt',
    content: `package tech.alicankorkmaz.portfolio.feature.contact.presentation

@Composable
<span class="keyword">fun</span> ContactScreen(onBackToProjects: () -> Unit) {
  Text(<span class="value">"akorkmaz@pm.me"</span>)
  Text(<span class="value">"linkedin.com/in/alicankorkmaz"</span>)
  Text(<span class="value">"x.com/alikorkmaz_apk"</span>)
  Button(onClick = onBackToProjects) {
    Text(<span class="value">"Back to Projects"</span>)
  }
}

<span class="comment">// Contact flow ships independently from other feature slices.</span>`
  },
  benchmarkBuildGradle: {
    tab: 'build.gradle.kts',
    status: ':benchmark/build.gradle.kts',
    content: `plugins {
  alias(libs.plugins.android.test)
  alias(libs.plugins.jetbrains.kotlin.android)
}

dependencies {
  implementation(project(<span class="value">":app"</span>))
  implementation(libs.androidx.benchmark.macro)
}

<span class="comment">// Performance budget is tracked via dedicated benchmark module.</span>`
  },
  macrobenchmark: {
    tab: 'StartupBenchmark.kt',
    status: ':benchmark/src/main/java/tech/alicankorkmaz/portfolio/benchmark/StartupBenchmark.kt',
    content: `package tech.alicankorkmaz.portfolio.benchmark

@RunWith(AndroidJUnit4::class)
class StartupBenchmark {
  @Test
  <span class="keyword">fun</span> startup() = benchmarkRule.measureRepeated {
    startActivityAndWait()
  }
}

<span class="comment">// Macrobenchmark validates startup time regressions in CI.</span>`
  }
};

const openAliases = {
  main: 'mainActivity',
  application: 'applicationClass',
  app: 'appBuildGradle',
  manifest: 'androidManifest',
  settings: 'settingsGradle',
  rootbuild: 'rootBuildGradle',
  versions: 'versionsToml',
  coreui: 'designSystemTokens',
  coredomain: 'dispatcherProvider',
  corenetwork: 'apiClient',
  coretesting: 'testDispatchers',
  projects: 'projectsScreen',
  projectsvm: 'projectsViewModel',
  profile: 'profileScreen',
  contact: 'contactScreen',
  benchmark: 'macrobenchmark'
};

const featureMeta = {
  projects: { label: 'Projects' },
  profile: { label: 'Profile' },
  contact: { label: 'Contact' }
};

const fileToFeatureMap = {
  projectsScreen: 'projects',
  profileScreen: 'profile',
  contactScreen: 'contact'
};

const fileKeyIndex = Object.keys(files).reduce((acc, key) => {
  acc[key.toLowerCase()] = key;
  return acc;
}, {});

function getFileIconKind(fileKey) {
  const file = files[fileKey];
  if (!file || typeof file.tab !== 'string') return 'icon-default';

  const tab = file.tab.toLowerCase();

  if (tab.endsWith('.kt')) return 'icon-kotlin';
  if (tab.endsWith('.xml')) return 'icon-xml';
  if (tab.endsWith('.toml')) return 'icon-toml';
  if (tab.includes('gradle') || tab.endsWith('.kts')) return 'icon-gradle';

  return 'icon-default';
}

function getFileIconGlyph(iconKind) {
  switch (iconKind) {
    case 'icon-kotlin':
      return 'code';
    case 'icon-gradle':
      return 'build';
    case 'icon-xml':
      return 'notes';
    case 'icon-toml':
      return 'view_list';
    default:
      return 'description';
  }
}

function getFolderIconGlyph(iconKind) {
  switch (iconKind) {
    case 'icon-module':
      return 'folder_open';
    case 'icon-scripts':
      return 'settings';
    default:
      return 'folder';
  }
}

function applyProjectTreeIcons() {
  const fileItems = fileTree.querySelectorAll('.tree-item');
  fileItems.forEach((item) => {
    const icon = item.querySelector('.node-icon.file');
    if (!icon) return;

    const iconKind = getFileIconKind(item.dataset.file);
    icon.classList.remove('icon-kotlin', 'icon-gradle', 'icon-xml', 'icon-toml', 'icon-default');
    icon.classList.add(iconKind);
    icon.textContent = getFileIconGlyph(iconKind);
    icon.setAttribute('aria-hidden', 'true');
  });

  const folderSummaries = fileTree.querySelectorAll('details.tree-package > summary.tree-entry');
  folderSummaries.forEach((summary) => {
    const icon = summary.querySelector('.node-icon.folder');
    if (!icon) return;

    const label = summary.querySelector('.node-label')?.textContent?.trim().toLowerCase() ?? '';
    icon.classList.remove('icon-module', 'icon-scripts', 'icon-folder');
    let folderIconKind = 'icon-folder';

    if (label === 'gradle scripts') {
      icon.classList.add('icon-scripts');
      folderIconKind = 'icon-scripts';
    } else if (label.startsWith(':')) {
      icon.classList.add('icon-module');
      folderIconKind = 'icon-module';
    } else {
      icon.classList.add('icon-folder');
    }

    icon.textContent = getFolderIconGlyph(folderIconKind);
    icon.setAttribute('aria-hidden', 'true');
  });
}

const kotlinTokenRegex =
  /(@[A-Za-z_][A-Za-z0-9_]*)|(\b(?:val|var)\b)(\s+)([a-z][A-Za-z0-9_]*)|(\.)([A-Z][A-Za-z0-9_]*)|\b(package|import|class|object|interface|data|sealed|enum|fun|val|var|private|public|internal|override|suspend|const|return|when|if|else|in|is|null|true|false|init|by)\b|\b([A-Z][A-Za-z0-9_]*)\b(?=,)|\b([A-Z][A-Za-z0-9_]*)\b|\b([a-z][A-Za-z0-9_]*)\b(?=\s*=)|\b([a-z][A-Za-z0-9_]*)\b(?=\s*\()|\b(\d+)\b/g;

const fileTree = document.getElementById('fileTree');
const collapseAllBtn = document.getElementById('collapseAllBtn');
const expandAllBtn = document.getElementById('expandAllBtn');
const codeBlock = document.getElementById('codeBlock');
const activeTab = document.getElementById('activeTab');
const statusFile = document.getElementById('statusFile');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalSheetToggle = document.getElementById('terminalSheetToggle');
const statusTerminalToggle = document.getElementById('statusTerminalToggle');
const clock = document.getElementById('clock');
const runButton = document.getElementById('runButton');
const runButtonLabel = document.getElementById('runButtonLabel');
const debugButton = document.getElementById('debugButton');
const debugButtonLabel = document.getElementById('debugButtonLabel');
const emulatorState = document.getElementById('emulatorState');
const bootLayer = document.getElementById('bootLayer');
const bootText = document.getElementById('bootText');
const appLayer = document.getElementById('appLayer');
const composeFeatureTag = document.getElementById('composeFeatureTag');
const composeModeBadge = document.getElementById('composeModeBadge');
const composeScreens = Array.from(document.querySelectorAll('[data-feature-screen]'));
const composeNavButtons = Array.from(document.querySelectorAll('[data-feature-nav]'));
const composeActionButtons = Array.from(document.querySelectorAll('[data-feature-action]'));
const mobileEmulatorStop = document.getElementById('mobileEmulatorStop');
const mobileViewportQuery = window.matchMedia('(max-width: 820px)');

let emulatorTimerA;
let emulatorTimerB;
let isDebugSession = false;
let activeFeature = 'projects';
let isTerminalOpen = false;
let hasAutoRunTriggered = false;

const AUTO_RUN_DELAY_MS = 900;

function clearEmulatorTimers() {
  clearTimeout(emulatorTimerA);
  clearTimeout(emulatorTimerB);
}

function setDebugUI(active) {
  isDebugSession = active;
  document.body.classList.toggle('debug-mode', active);
  if (debugButton) debugButton.classList.toggle('is-active', active);
  if (debugButtonLabel) debugButtonLabel.textContent = active ? 'Stop Debug' : 'Debug';
  if (composeModeBadge) composeModeBadge.textContent = active ? 'DEBUG' : 'RUN';
}

function syncTerminalToggleUI() {
  if (terminalSheetToggle) {
    terminalSheetToggle.textContent = isTerminalOpen ? 'Hide' : 'Show';
    terminalSheetToggle.setAttribute('aria-expanded', String(isTerminalOpen));
  }

  if (statusTerminalToggle) {
    statusTerminalToggle.textContent = isTerminalOpen ? 'Hide Terminal' : 'Terminal';
    statusTerminalToggle.setAttribute('aria-expanded', String(isTerminalOpen));
  }
}

function setTerminalOpen(nextOpen) {
  isTerminalOpen = Boolean(nextOpen);
  document.body.classList.toggle('terminal-open', isTerminalOpen);
  syncTerminalToggleUI();
}

function toggleTerminalOpen() {
  if (!mobileViewportQuery.matches) return;
  setTerminalOpen(!isTerminalOpen);
}

function setActiveFeature(featureKey, options = {}) {
  const { announce = false } = options;
  if (!featureMeta[featureKey]) return;

  activeFeature = featureKey;
  if (composeFeatureTag) composeFeatureTag.textContent = featureMeta[featureKey].label;

  composeScreens.forEach((screen) => {
    screen.classList.toggle('is-active', screen.dataset.featureScreen === featureKey);
  });

  composeNavButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.featureNav === featureKey);
  });

  if (announce && document.body.classList.contains('run-mode')) {
    appendOutput(`Switched emulator screen to ${featureMeta[featureKey].label}.`);
  }
}

function startEmulator(options = {}) {
  const { debug = false } = options;
  clearEmulatorTimers();
  setTerminalOpen(false);
  setDebugUI(debug);
  setActiveFeature(activeFeature);
  document.body.classList.add('run-mode');
  runButton.classList.add('is-running');
  if (runButtonLabel) runButtonLabel.textContent = 'Stop';
  emulatorState.textContent = 'Booting';
  bootText.textContent = debug ? 'Attaching debugger...' : 'Launching virtual device...';
  bootLayer.classList.remove('done');
  appLayer.classList.remove('ready');
  appendOutput('Running app on Pixel 8 Pro API 35...');

  emulatorTimerA = setTimeout(() => {
    bootText.textContent = debug ? 'Resolving breakpoints...' : 'Installing app bundle...';
  }, 620);

  emulatorTimerB = setTimeout(() => {
    bootLayer.classList.add('done');
    appLayer.classList.add('ready');
    emulatorState.textContent = debug ? 'Debugging' : 'Running';
    appendOutput(debug ? 'Debugger attached. Breakpoints are active.' : 'App launched successfully.');
  }, 1450);
}

function attachDebugger() {
  if (!document.body.classList.contains('run-mode')) {
    startEmulator({ debug: true });
    return;
  }
  if (isDebugSession) return;
  setDebugUI(true);
  emulatorState.textContent = 'Debugging';
  appendOutput('Debugger attached to running session.');
}

function stopEmulator() {
  clearEmulatorTimers();
  setDebugUI(false);
  document.body.classList.remove('run-mode');
  runButton.classList.remove('is-running');
  if (runButtonLabel) runButtonLabel.textContent = 'Run';
  emulatorState.textContent = 'Idle';
  bootText.textContent = 'Launching emulator...';
  bootLayer.classList.remove('done');
  appLayer.classList.remove('ready');
  appendOutput('Emulator stopped.');
}

function triggerAutoRun() {
  if (hasAutoRunTriggered || document.body.classList.contains('run-mode')) return;
  hasAutoRunTriggered = true;
  appendOutput(`Auto-starting emulator in ${AUTO_RUN_DELAY_MS}ms...`);
  setTimeout(() => {
    if (!document.body.classList.contains('run-mode')) {
      startEmulator({ debug: false });
    }
  }, AUTO_RUN_DELAY_MS);
}

function scheduleAutoRunAfterInitialization() {
  if (document.readyState === 'complete') {
    triggerAutoRun();
    return;
  }
  window.addEventListener('load', triggerAutoRun, { once: true });
}

function expandParents(node) {
  let current = node.parentElement;
  while (current && current !== fileTree) {
    if (current.tagName === 'DETAILS') {
      current.open = true;
    }
    current = current.parentElement;
  }
}

function setProjectTreeState(expanded) {
  const packages = fileTree.querySelectorAll('details.tree-package');
  packages.forEach((pkg, index) => {
    pkg.open = expanded || index === 0;
  });
}

function isKotlinFile(tabLabel) {
  return typeof tabLabel === 'string' && /\.kts?$/.test(tabLabel);
}

function buildTokenNode(token, className) {
  const node = document.createElement('span');
  node.className = className;
  node.textContent = token;
  return node;
}

function tokenizeKotlinText(text) {
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  let match;

  while ((match = kotlinTokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      fragment.append(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    if (match[1]) {
      fragment.append(buildTokenNode(match[1], 'kotlin-annotation'));
    } else if (match[2] && match[4]) {
      fragment.append(buildTokenNode(match[2], 'keyword'));
      fragment.append(document.createTextNode(match[3]));
      fragment.append(buildTokenNode(match[4], 'kotlin-variable'));
    } else if (match[5] && match[6]) {
      fragment.append(document.createTextNode(match[5]));
      fragment.append(buildTokenNode(match[6], 'kotlin-enum'));
    } else if (match[7]) {
      fragment.append(buildTokenNode(match[7], 'keyword'));
    } else if (match[8]) {
      fragment.append(buildTokenNode(match[8], 'kotlin-enum'));
    } else if (match[9]) {
      fragment.append(buildTokenNode(match[9], 'type'));
    } else if (match[10]) {
      fragment.append(buildTokenNode(match[10], 'kotlin-variable'));
    } else if (match[11]) {
      fragment.append(buildTokenNode(match[11], 'kotlin-func'));
    } else if (match[12]) {
      fragment.append(buildTokenNode(match[12], 'kotlin-number'));
    }

    lastIndex = kotlinTokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    fragment.append(document.createTextNode(text.slice(lastIndex)));
  }

  kotlinTokenRegex.lastIndex = 0;
  return fragment;
}

function highlightKotlinContent(htmlContent) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlContent;
  const walker = document.createTreeWalker(wrapper, NodeFilter.SHOW_TEXT);
  const nodesToTokenize = [];

  while (walker.nextNode()) {
    const textNode = walker.currentNode;
    const parent = textNode.parentElement;
    if (!parent || !textNode.nodeValue || !textNode.nodeValue.trim()) continue;

    if (
      parent.closest(
        '.comment, .value, .keyword, .type, .kotlin-annotation, .kotlin-func, .kotlin-number, .kotlin-variable, .kotlin-enum'
      )
    ) {
      continue;
    }

    nodesToTokenize.push(textNode);
  }

  nodesToTokenize.forEach((textNode) => {
    textNode.replaceWith(tokenizeKotlinText(textNode.nodeValue));
  });

  return wrapper.innerHTML;
}

function renderFile(key) {
  const file = files[key];
  if (!file) return;

  codeBlock.innerHTML = isKotlinFile(file.tab) ? highlightKotlinContent(file.content) : file.content;
  activeTab.textContent = file.tab;
  statusFile.textContent = file.status;

  fileTree.querySelectorAll('.tree-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.file === key);
  });

  const selected = fileTree.querySelector(`.tree-item[data-file="${key}"]`);
  if (selected) {
    expandParents(selected);
    selected.scrollIntoView({ block: 'nearest' });
  }

  const featureKey = fileToFeatureMap[key];
  if (featureKey) {
    setActiveFeature(featureKey, { announce: true });
  }
}

function appendOutput(text) {
  const line = document.createElement('div');
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleCommand(rawInput) {
  const input = rawInput.trim();
  if (!input) return;

  appendOutput(`$ ${input}`);

  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(' ').toLowerCase();

  switch (cmd.toLowerCase()) {
    case 'help':
      appendOutput('Commands: help, ls, open <alias>, run, debug, stop, clear, whoami, social');
      appendOutput('Aliases: main, application, app, settings, coreui, projects, profile, contact, benchmark');
      break;
    case 'ls':
      appendOutput(':app, :core:ui, :core:domain, :core:network, :core:testing');
      appendOutput(':feature:projects, :feature:profile, :feature:contact, :benchmark');
      appendOutput('Gradle Scripts: settings.gradle.kts, build.gradle.kts, libs.versions.toml');
      break;
    case 'open': {
      const target = openAliases[arg] || fileKeyIndex[arg];
      if (!files[target]) {
        appendOutput('Unknown target. Try: open projects');
        break;
      }
      renderFile(target);
      appendOutput(`Opened ${files[target].status}`);
      break;
    }
    case 'whoami':
      appendOutput('Mobile Software Architect at adesso Turkey focused on Kotlin, Compose, and feature-based architecture.');
      break;
    case 'social':
      appendOutput('LinkedIn: https://www.linkedin.com/in/alicankorkmaz/');
      appendOutput('X: https://x.com/alikorkmaz_apk');
      appendOutput('Open links from the Contact screen.');
      break;
    case 'run':
      startEmulator({ debug: false });
      break;
    case 'debug':
      attachDebugger();
      break;
    case 'stop':
      stopEmulator();
      break;
    case 'clear':
      terminalOutput.innerHTML = '';
      break;
    default:
      appendOutput(`Unknown command: ${cmd}`);
      break;
  }
}

fileTree.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest('.tree-item');
  if (!button) return;
  renderFile(button.dataset.file);
});

terminalInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  handleCommand(terminalInput.value);
  terminalInput.value = '';
});

if (terminalInput) {
  terminalInput.addEventListener('focus', () => {
    if (mobileViewportQuery.matches) {
      setTerminalOpen(true);
    }
  });
}

if (terminalSheetToggle) {
  terminalSheetToggle.addEventListener('click', () => {
    toggleTerminalOpen();
  });
}

if (statusTerminalToggle) {
  statusTerminalToggle.addEventListener('click', () => {
    toggleTerminalOpen();
  });
}

if (runButton) {
  runButton.addEventListener('click', () => {
    if (document.body.classList.contains('run-mode')) {
      stopEmulator();
      return;
    }
    startEmulator({ debug: false });
  });
}

if (debugButton) {
  debugButton.addEventListener('click', () => {
    if (isDebugSession) {
      stopEmulator();
      return;
    }
    attachDebugger();
  });
}

if (mobileEmulatorStop) {
  mobileEmulatorStop.addEventListener('click', () => {
    stopEmulator();
  });
}

composeNavButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveFeature(button.dataset.featureNav, { announce: true });
  });
});

composeActionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveFeature(button.dataset.featureAction, { announce: true });
  });
});

if (collapseAllBtn) {
  collapseAllBtn.addEventListener('click', () => {
    setProjectTreeState(false);
  });
}

if (expandAllBtn) {
  expandAllBtn.addEventListener('click', () => {
    setProjectTreeState(true);
  });
}

const handleMobileViewportChange = (event) => {
  if (!event.matches) {
    setTerminalOpen(false);
    return;
  }
  syncTerminalToggleUI();
};

if (typeof mobileViewportQuery.addEventListener === 'function') {
  mobileViewportQuery.addEventListener('change', handleMobileViewportChange);
} else if (typeof mobileViewportQuery.addListener === 'function') {
  mobileViewportQuery.addListener(handleMobileViewportChange);
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

updateClock();
setInterval(updateClock, 1000);

applyProjectTreeIcons();
setActiveFeature(activeFeature);
syncTerminalToggleUI();
renderFile('mainActivity');
scheduleAutoRunAfterInitialization();
