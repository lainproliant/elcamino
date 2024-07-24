import Bulletin from '../models/bulletin.ts';

function BulletinCard({bulletin}: {bulletin: Bulletin}) {
    return (
        <div className="capsule-box flex gap-3">
            <div className="avatar flex-none">
                <div className="mask mask-hexagon w-24 flex-none">
                    <img src={bulletin.thumbnail_url} alt={bulletin.author} />
                </div>
            </div>
            <div className="bulletin flex flex-col">
                <div className="bulletin-text grow flex items-center">
                    <div className="text-2xl text-ellipsis line-clamp-3 max-h-20 flex-1">
                        {bulletin.message}
                    </div>
                </div>
                <div className="bulletin-expiry flex-none text-sm italic text-slate-500">
                    expires {bulletin.expiry_dt.format("dddd MMMM D hh:mma").toLowerCase()}
                </div>
            </div>
        </div>
    )
}

export default BulletinCard;
