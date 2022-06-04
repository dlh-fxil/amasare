import * as HIcons from "@heroicons/react/outline";
import * as HIconsSolid from "@heroicons/react/solid";

const Icons = ({
	icon = null,
	outline = false,
	className = "h-6 w-6 text-white",
	...props
}) => {
	const Icon = name => {
		const { ...icons } = HIconsSolid;
		const TheIcon = icons[name];
		return (
			<TheIcon
				className={`${className} pointer-events-none`}
				{...props}
				aria-hidden="true"
			/>
		);
	};
	const IconOutline = name => {
		const { ...icons } = HIcons;
		const TheIcon = icons[name];
		return (
			<TheIcon
				className={`${className} pointer-events-none`}
				{...props}
				aria-hidden="true"
			/>
		);
	};
	let nameIcon = "BanIcon";
	if (icon && iconNames.includes(icon)) {
		nameIcon = icon;
	}
	if (outline) {
		return IconOutline(nameIcon);
	}
	return Icon(nameIcon);
};
export default Icons;

function ListHiroIcons() {
	const allIcons = iconNames;

	return (
		<div className="grid grid-cols-9 gap-2">
			{allIcons.map((keyName, i) => (
				<div
					className="border-slate-500 bg-slate-900 text-slate-100 even:bg-slate-800 even:text-slate-50 cursor-pointer group  relative rounded-t pt-2 border gap-2 flex flex-col justify-center items-center"
					key={i}
					onClick={e => {
						navigator.clipboard.writeText(keyName);
					}}>
					<button className="absolute group-even:bg-opacity-50 bg-opacity-50 h-full w-full group-hover:block hidden top-0 pointer-events-none left-0 group-even:bg-rose-500 bg-green-900">
						Salin
					</button>
					<div className="w-full px-2 flex group-hover:justify-start justify-center items-center gap-2">
						<Icons outline className="h-6 w-6 text-current" icon={keyName} />
						<Icons className="h-6 w-6 text-current" icon={keyName} />
					</div>
					<label className="w-full group-even:bg-slate-900 bg-slate-800 text-center text-xs border-b-slate-500 group-even:text-slate-100 text-slate-50">
						{" "}
						{keyName}
					</label>
				</div>
			))}
		</div>
	);
}

const iconNames = [
	"AcademicCapIcon",
	"AdjustmentsIcon",
	"AnnotationIcon",
	"ArchiveIcon",
	"ArrowCircleDownIcon",
	"ArrowCircleLeftIcon",
	"ArrowCircleRightIcon",
	"ArrowCircleUpIcon",
	"ArrowDownIcon",
	"ArrowLeftIcon",
	"ArrowNarrowDownIcon",
	"ArrowNarrowLeftIcon",
	"ArrowNarrowRightIcon",
	"ArrowNarrowUpIcon",
	"ArrowRightIcon",
	"ArrowSmDownIcon",
	"ArrowSmLeftIcon",
	"ArrowSmRightIcon",
	"ArrowSmUpIcon",
	"ArrowUpIcon",
	"ArrowsExpandIcon",
	"AtSymbolIcon",
	"BackspaceIcon",
	"BadgeCheckIcon",
	"BanIcon",
	"BeakerIcon",
	"BellIcon",
	"BookOpenIcon",
	"BookmarkAltIcon",
	"BookmarkIcon",
	"BriefcaseIcon",
	"CakeIcon",
	"CalculatorIcon",
	"CalendarIcon",
	"CameraIcon",
	"CashIcon",
	"ChartBarIcon",
	"ChartPieIcon",
	"ChartSquareBarIcon",
	"ChatAlt2Icon",
	"ChatAltIcon",
	"ChatIcon",
	"CheckCircleIcon",
	"CheckIcon",
	"ChevronDoubleDownIcon",
	"ChevronDoubleLeftIcon",
	"ChevronDoubleRightIcon",
	"ChevronDoubleUpIcon",
	"ChevronDownIcon",
	"ChevronLeftIcon",
	"ChevronRightIcon",
	"ChevronUpIcon",
	"ChipIcon",
	"ClipboardCheckIcon",
	"ClipboardCopyIcon",
	"ClipboardListIcon",
	"ClipboardIcon",
	"ClockIcon",
	"CloudDownloadIcon",
	"CloudUploadIcon",
	"CloudIcon",
	"CodeIcon",
	"CogIcon",
	"CollectionIcon",
	"ColorSwatchIcon",
	"CreditCardIcon",
	"CubeTransparentIcon",
	"CubeIcon",
	"CurrencyBangladeshiIcon",
	"CurrencyDollarIcon",
	"CurrencyEuroIcon",
	"CurrencyPoundIcon",
	"CurrencyRupeeIcon",
	"CurrencyYenIcon",
	"CursorClickIcon",
	"DatabaseIcon",
	"DesktopComputerIcon",
	"DeviceMobileIcon",
	"DeviceTabletIcon",
	"DocumentAddIcon",
	"DocumentDownloadIcon",
	"DocumentDuplicateIcon",
	"DocumentRemoveIcon",
	"DocumentReportIcon",
	"DocumentSearchIcon",
	"DocumentTextIcon",
	"DocumentIcon",
	"DotsCircleHorizontalIcon",
	"DotsHorizontalIcon",
	"DotsVerticalIcon",
	"DownloadIcon",
	"DuplicateIcon",
	"EmojiHappyIcon",
	"EmojiSadIcon",
	"ExclamationCircleIcon",
	"ExclamationIcon",
	"ExternalLinkIcon",
	"EyeOffIcon",
	"EyeIcon",
	"FastForwardIcon",
	"FilmIcon",
	"FilterIcon",
	"FingerPrintIcon",
	"FireIcon",
	"FlagIcon",
	"FolderAddIcon",
	"FolderDownloadIcon",
	"FolderOpenIcon",
	"FolderRemoveIcon",
	"FolderIcon",
	"GiftIcon",
	"GlobeAltIcon",
	"GlobeIcon",
	"HandIcon",
	"HashtagIcon",
	"HeartIcon",
	"HomeIcon",
	"IdentificationIcon",
	"InboxInIcon",
	"InboxIcon",
	"InformationCircleIcon",
	"KeyIcon",
	"LibraryIcon",
	"LightBulbIcon",
	"LightningBoltIcon",
	"LinkIcon",
	"LocationMarkerIcon",
	"LockClosedIcon",
	"LockOpenIcon",
	"LoginIcon",
	"LogoutIcon",
	"MailOpenIcon",
	"MailIcon",
	"MapIcon",
	"MenuAlt1Icon",
	"MenuAlt2Icon",
	"MenuAlt3Icon",
	"MenuAlt4Icon",
	"MenuIcon",
	"MicrophoneIcon",
	"MinusCircleIcon",
	"MinusSmIcon",
	"MinusIcon",
	"MoonIcon",
	"MusicNoteIcon",
	"NewspaperIcon",
	"OfficeBuildingIcon",
	"PaperAirplaneIcon",
	"PaperClipIcon",
	"PauseIcon",
	"PencilAltIcon",
	"PencilIcon",
	"PhoneIncomingIcon",
	"PhoneMissedCallIcon",
	"PhoneOutgoingIcon",
	"PhoneIcon",
	"PhotographIcon",
	"PlayIcon",
	"PlusCircleIcon",
	"PlusSmIcon",
	"PlusIcon",
	"PresentationChartBarIcon",
	"PresentationChartLineIcon",
	"PrinterIcon",
	"PuzzleIcon",
	"QrcodeIcon",
	"QuestionMarkCircleIcon",
	"ReceiptRefundIcon",
	"ReceiptTaxIcon",
	"RefreshIcon",
	"ReplyIcon",
	"RewindIcon",
	"RssIcon",
	"SaveAsIcon",
	"SaveIcon",
	"ScaleIcon",
	"ScissorsIcon",
	"SearchCircleIcon",
	"SearchIcon",
	"SelectorIcon",
	"ServerIcon",
	"ShareIcon",
	"ShieldCheckIcon",
	"ShieldExclamationIcon",
	"ShoppingBagIcon",
	"ShoppingCartIcon",
	"SortAscendingIcon",
	"SortDescendingIcon",
	"SparklesIcon",
	"SpeakerphoneIcon",
	"StarIcon",
	"StatusOfflineIcon",
	"StatusOnlineIcon",
	"StopIcon",
	"SunIcon",
	"SupportIcon",
	"SwitchHorizontalIcon",
	"SwitchVerticalIcon",
	"TableIcon",
	"TagIcon",
	"TemplateIcon",
	"TerminalIcon",
	"ThumbDownIcon",
	"ThumbUpIcon",
	"TicketIcon",
	"TranslateIcon",
	"TrashIcon",
	"TrendingDownIcon",
	"TrendingUpIcon",
	"TruckIcon",
	"UploadIcon",
	"UserAddIcon",
	"UserCircleIcon",
	"UserGroupIcon",
	"UserRemoveIcon",
	"UserIcon",
	"UsersIcon",
	"VariableIcon",
	"VideoCameraIcon",
	"ViewBoardsIcon",
	"ViewGridAddIcon",
	"ViewGridIcon",
	"ViewListIcon",
	"VolumeOffIcon",
	"VolumeUpIcon",
	"WifiIcon",
	"XCircleIcon",
	"XIcon",
	"ZoomInIcon",
	"ZoomOutIcon",
];
