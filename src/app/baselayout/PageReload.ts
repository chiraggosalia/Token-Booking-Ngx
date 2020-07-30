import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PageReload {

  constructor(private router: Router) {

  }

  redirectTo(uri) {
    // TODO add refresh component e.g. /refresh
    this.router.navigateByUrl('/auth',{skipLocationChange:true}).then(() =>
      this.router.navigate([uri])
    );
  }
}
